import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { weekendAssignmentSchema } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { persistence } from "@tanstack-db/persistence";

const baseOptions = queryCollectionOptions({
  id: "weekend_assignment",
    queryKey: ["weekend_assignment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weekend_assignment")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: ({ congregation_id, week_id, assignment_id }) =>
      congregation_id + week_id + assignment_id,
    schema: weekendAssignmentSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("weekend_assignment").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("weekend_assignment")
        .update(changes)
        .eq("assignment_id", original.assignment_id)
        .eq("congregation_id", original.congregation_id)
        .eq("week_id", original.week_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("weekend_assignment")
        .delete()
        .eq("assignment_id", original.assignment_id)
        .eq("congregation_id", original.congregation_id)
        .eq("week_id", original.week_id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const weekendAssignmentCollection = createCollection({
  ...persistedOptions,
  schema: weekendAssignmentSchema,
});
