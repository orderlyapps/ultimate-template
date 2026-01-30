import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { avParticipationSchema } from "@tanstack-db/av_participation/avParticipationSchema";

export const avParticipationCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["av_participation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("av_participation")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.participant_id + item.participation_id,
    schema: avParticipationSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("av_participation").insert(changes);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("av_participation")
        .delete()
        .eq("participant_id", original.participant_id)
        .eq("participation_id", original.participation_id);
    },
  })
);
