import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { cleanMinorSchema } from "@tanstack-db/clean_minor/cleanMinorSchema";

export const cleanMinorCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["clean_minor"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clean_minor")
        .select("*")
        .order("week_id", { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.congregation_id + item.week_id,
    schema: cleanMinorSchema,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("clean_minor")
        .insert(changes);

      if (error) {
        return error;
      }

      return data;
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("clean_minor")
        .update(changes)
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);

      if (error) {
        return error;
      }

      return data;
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("clean_minor")
        .delete()
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);

      if (error) {
        return error;
      }

      return data;
    },
  }),
);
