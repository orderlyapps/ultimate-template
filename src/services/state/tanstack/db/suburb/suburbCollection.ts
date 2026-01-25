import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { suburbSchema } from "@tanstack-db/suburb/suburbSchema";

export const suburbCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["suburb"],
    queryFn: async () => {
      const { data, error } = await supabase.from("suburb").select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: suburbSchema,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      const { data, error } = await supabase.from("suburb").insert(changes);
      if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
      }
      return data;
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("suburb")
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
        .from("suburb")
        .delete()
        .eq("id", original.id);
      if (error) {
        throw new Error(`Failed to insert todo: ${error.message}`);
      }
      return data;
    },
  }),
);
