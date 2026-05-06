import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { reportPermissionSchema } from "./reportPermissionSchema";
import { persistence } from "@tanstack-db/persistence";

/** Collection for the report_permission table */
const baseOptions = queryCollectionOptions({
  id: "report_permission",
    queryKey: ["report_permission"],

    queryFn: async () => {
      const { data, error } = await supabase.from("report_permission").select("*");

      if (error) {
        throw new Error(`Failed to fetch report_permission: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: reportPermissionSchema,

    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("report_permission").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("report_permission")
        .update(changes)
        .eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("report_permission").delete().eq("id", original.id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const reportPermissionCollection = createCollection({
  ...persistedOptions,
  schema: reportPermissionSchema,
});
