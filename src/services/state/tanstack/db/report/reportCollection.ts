import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { reportSchema, type Report } from "@tanstack-db/report/reportSchema";
import { persistence } from "@tanstack-db/persistence";

/** Collection for the public.report table with composite key (confidential_id, congregation_id, date) */
const baseOptions = queryCollectionOptions({
  id: "report",
    queryKey: ["report"],

    queryFn: async () => {
      /**
       * PostgREST caps responses at a default of 1000 rows per request, so a
       * single `.select("*")` silently truncates once the table grows. We
       * page through the result set explicitly so freshly upserted rows are
       * not lost behind the cap (which previously caused "saved values
       * revert on reload" symptoms).
       */
      const PAGE_SIZE = 1000;
      const all: Report[] = [];
      for (let from = 0; ; from += PAGE_SIZE) {
        const to = from + PAGE_SIZE - 1;
        const { data, error } = await supabase
          .from("report")
          .select("*")
          .order("date", { ascending: false })
          .order("confidential_id", { ascending: true })
          .range(from, to);

        if (error) {
          throw new Error(`Failed to fetch report: ${error.message}`);
        }

        if (!data || data.length === 0) break;
        all.push(...data);
        if (data.length < PAGE_SIZE) break;
      }
      return all;
    },

    queryClient,

    schema: reportSchema,

    getKey: ({ confidential_id, congregation_id, date }) =>
      confidential_id + congregation_id + date,

    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      /**
       * Use upsert on the composite primary key so the write is idempotent.
       * The local collection can be missing a row that already exists in the
       * database (e.g. when an RLS SELECT policy filters it out for the
       * current user) — without upsert that produces a 23505 unique violation
       * even though the user is editing "their own" report.
       */
      const { data, error } = await supabase
        .from("report")
        .upsert(modified, {
          onConflict: "confidential_id,congregation_id,date",
        })
        .select();
      if (error) {
        console.error("[report] insert/upsert failed", { error, modified });
        throw new Error(`Failed to save report: ${error.message}`);
      }
      if (!data || data.length === 0) {
        console.error(
          "[report] upsert returned no rows (likely RLS WITH CHECK rejection)",
          { modified },
        );
        throw new Error(
          "Save succeeded but returned no rows. An RLS policy is probably blocking the write.",
        );
      }
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("report")
        .update(changes)
        .eq("confidential_id", original.confidential_id)
        .eq("congregation_id", original.congregation_id)
        .eq("date", original.date)
        .select();
      if (error) {
        console.error("[report] update failed", { error, changes, original });
        throw new Error(`Failed to update report: ${error.message}`);
      }
      if (!data || data.length === 0) {
        console.error(
          "[report] update affected 0 rows (RLS USING/WITH CHECK or stale key)",
          { changes, original },
        );
        throw new Error(
          "Update affected 0 rows. An RLS policy is probably blocking the write, or the row no longer exists.",
        );
      }
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("report")
        .delete()
        .eq("confidential_id", original.confidential_id)
        .eq("congregation_id", original.congregation_id)
        .eq("date", original.date)
        .select();
      if (error) {
        console.error("[report] delete failed", { error, original });
        throw new Error(`Failed to delete report: ${error.message}`);
      }
      if (!data || data.length === 0) {
        console.error("[report] delete affected 0 rows", { original });
        throw new Error(
          "Delete affected 0 rows. An RLS policy is probably blocking the write.",
        );
      }
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const reportCollection = createCollection({
  ...persistedOptions,
  schema: reportSchema,
});
