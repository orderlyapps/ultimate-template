import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { reportSchema } from "@tanstack-db/report/reportSchema";

/** Collection for the public.report table with composite key (confidential_id, congregation_id, date) */
export const reportCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["report"],

    queryFn: async () => {
      const { data, error } = await supabase.from("report").select("*");

      if (error) {
        throw new Error(`Failed to fetch report: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: reportSchema,

    getKey: ({ confidential_id, congregation_id, date }) =>
      confidential_id + congregation_id + date,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("report").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("report")
        .update(changes)
        .eq("confidential_id", original.confidential_id)
        .eq("congregation_id", original.congregation_id)
        .eq("date", original.date);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("report")
        .delete()
        .eq("confidential_id", original.confidential_id)
        .eq("congregation_id", original.congregation_id)
        .eq("date", original.date);
    },
  })
);
