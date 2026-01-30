import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { speakerAssignmentSchema } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";

export const speakerAssignmentCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["speaker_assignment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("speaker_assignment")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,

    getKey: (item) => item.week_id + item.congregation_id,

    schema: speakerAssignmentSchema,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("speaker_assignment").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("speaker_assignment")
        .update(changes)
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("speaker_assignment")
        .delete()
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id);
    },
  })
);
