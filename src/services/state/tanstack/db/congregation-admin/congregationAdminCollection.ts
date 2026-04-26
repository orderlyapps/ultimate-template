import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { congregationAdminSchema } from "./congregationAdminSchema";

/** Collection for the congregation_admin table */
export const congregationAdminCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["congregation_admin"],

    queryFn: async () => {
      const { data, error } = await supabase.from("congregation_admin").select("*");

      if (error) {
        throw new Error(`Failed to fetch congregation_admin: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: congregationAdminSchema,

    getKey: (item) => item.id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("congregation_admin").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("congregation_admin")
        .update(changes)
        .eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("congregation_admin").delete().eq("id", original.id);
    },
  })
);
