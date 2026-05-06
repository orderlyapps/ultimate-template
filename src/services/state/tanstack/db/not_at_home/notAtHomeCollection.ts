import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { notAtHomeSchema } from "@tanstack-db/not_at_home/notAtHomeSchema";
import { persistence } from "@tanstack-db/persistence";

const baseOptions = queryCollectionOptions({
  id: "not_at_home",
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
      const { data, error } = await supabase
        .from("not_at_home")
        .insert(changes);
      if (error) {
        throw new Error(`Failed to insert not at home: ${error.message}`);
      }
      return data;
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("not_at_home")
        .update(changes)
        .eq("id", original.id);
      if (error) {
        throw new Error(`Failed to update not at home: ${error.message}`);
      }
      return data;
    },
    
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("not_at_home")
        .delete()
        .eq("id", original.id);
      if (error) {
        throw new Error(`Failed to delete not at home: ${error.message}`);
      }
      return data;
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const notAtHomeCollection = createCollection({
  ...persistedOptions,
  schema: notAtHomeSchema,
});
