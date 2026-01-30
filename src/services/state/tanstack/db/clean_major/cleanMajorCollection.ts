import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { cleanMajorSchema } from "@tanstack-db/clean_major/cleanMajorSchema";

export const cleanMajorCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["clean_major"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clean_major")
        .select("*")
        .eq("congregation_id", localStorage.getItem("congregationId"))
        .order("week_id", { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.congregation_id + item.week_id,
    schema: cleanMajorSchema,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("clean_major").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("clean_major")
        .update(changes)
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("clean_major")
        .delete()
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);
    },
  })
);
