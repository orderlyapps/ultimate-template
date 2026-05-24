import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { secretaryPermissionSchema } from "./secretaryPermissionSchema";

/**
 * Collection for the secretary_permission table.
 * Intentionally not persisted so permissions are always fetched fresh from
 * the server on page load — this ensures revoked access takes effect immediately.
 */
export const secretaryPermissionCollection = createCollection(
  queryCollectionOptions({
    id: "secretary_permission",
    queryKey: ["secretary_permission"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("secretary_permission")
        .select("*");

      if (error) {
        throw new Error(
          `Failed to fetch secretary_permission: ${error.message}`
        );
      }

      return data;
    },

    queryClient,

    schema: secretaryPermissionSchema,

    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("secretary_permission").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("secretary_permission")
        .update(changes)
        .eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("secretary_permission")
        .delete()
        .eq("id", original.id);
    },
  })
);
