import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { streetSchema } from "@tanstack-db/street/streetSchema";

export const streetCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["street"],
    queryFn: async () => {
      const { data, error } = await supabase.from("street").select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: streetSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      const { data, error } = await supabase.from("street").insert(changes);
      if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
      }
      return data;
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("street")
        .update(changes)
        .eq("id", original.id);
      if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
      }
      return data;
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("street")
        .delete()
        .eq("id", original.id);
      if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
      }
      return data;
    },
  }),
);
