import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { cleanPermissionSchema } from "./cleanPermissionSchema";
import { persistence } from "@tanstack-db/persistence";

/** Collection for the clean_permission table */
const baseOptions = queryCollectionOptions({
  id: "clean_permission",
    queryKey: ["clean_permission"],

    queryFn: async () => {
      const { data, error } = await supabase.from("clean_permission").select("*");

      if (error) {
        throw new Error(`Failed to fetch clean_permission: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: cleanPermissionSchema,

    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("clean_permission").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("clean_permission")
        .update(changes)
        .eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("clean_permission").delete().eq("id", original.id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const cleanPermissionCollection = createCollection({
  ...persistedOptions,
  schema: cleanPermissionSchema,
});
