import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { outlineSchema } from "@tanstack-db/outline/outlineSchema";

export const outlineCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["outline"],
    queryFn: async () => {
      const { data, error } = await supabase.from("outline").select("*");

      if (error) {
        throw new Error(`Failed to fetch outline: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: outlineSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("outline").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("outline").update(changes).eq("id", original.id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("outline").delete().eq("id", original.id);
    },
  })
);
