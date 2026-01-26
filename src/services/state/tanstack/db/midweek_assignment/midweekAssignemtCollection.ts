import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { midweekAssignmentSchema } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";

export const midweekAssignmentCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["midweek_assignment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("midweek_assignment")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch midweek assignment: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) =>
      `${item.congregation_id}-${item.week_id}-${item.assignment_id}`,
    schema: midweekAssignmentSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("midweek_assignment").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("midweek_assignment")
        .update(changes)
        .eq("assignment_id", original.assignment_id)
        .eq("congregation_id", original.congregation_id)
        .eq("week_id", original.week_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("midweek_assignment")
        .delete()
        .eq("assignment_id", original.assignment_id)
        .eq("congregation_id", original.congregation_id)
        .eq("week_id", original.week_id);
    },
  }),
);
