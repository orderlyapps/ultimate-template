import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { weekendParticipationSchema } from "@tanstack-db/weekend_participation/weekendParticipationSchema";

export const weekendParticipationCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["weekend_participation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weekend_participation")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.participant_id + item.participation_id,
    schema: weekendParticipationSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("weekend_participation").insert(changes);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("weekend_participation")
        .delete()
        .eq("participant_id", original.participant_id)
        .eq("participation_id", original.participation_id);
    },
  })
);
