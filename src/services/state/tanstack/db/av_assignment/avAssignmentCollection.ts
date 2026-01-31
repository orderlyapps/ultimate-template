import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { avAssignmentSchema } from "@tanstack-db/av_assignment/avAssignmentSchema";

export const avAssignmentCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["av_assignment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("av_assignment")
        .select("*")
        .order("week_id", { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: ({ congregation_id, week_id, assignment_id }) =>
      congregation_id + week_id + assignment_id,
    schema: avAssignmentSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("av_assignment").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("av_assignment")
        .update(changes)
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id)
        .eq("assignment_id", original.assignment_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("av_assignment")
        .delete()
        .eq("week_id", original.week_id)
        .eq("congregation_id", original.congregation_id)
        .eq("assignment_id", original.assignment_id);
    },
  }),
);
