import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { congregationSchema } from "@tanstack-db/congregation/congregationSchema";

export const congregationCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["congregation"],

    queryFn: async () => {
      const { data, error } = await supabase.from("congregation").select("*");

      if (error) {
        throw new Error(`Failed to fetch congregation: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: congregationSchema,

    getKey: (congregation) => congregation.id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("congregation").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("congregation").update(changes).eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("congregation").delete().eq("id", original.id);
    },
  })
);
