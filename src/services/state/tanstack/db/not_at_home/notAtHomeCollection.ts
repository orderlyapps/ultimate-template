import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { notAtHomeSchema } from "@tanstack-db/not_at_home/notAtHomeSchema";

export const notAtHomeCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["not_at_home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("not_at_home").select("*");

      if (error) {
        throw new Error(`Failed to fetch not at home: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: notAtHomeSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("not_at_home").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("not_at_home").update(changes).eq("id", original.id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("not_at_home").delete().eq("id", original.id);
    },
  }),
);
