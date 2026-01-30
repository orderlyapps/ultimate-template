import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { speakerAvailabilitySchema } from "@tanstack-db/speaker_availability/speakerAvailabilitySchema";

export const speakerAvailabilityCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["speaker_availability"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("speaker_availability")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.speaker_id,
    schema: speakerAvailabilitySchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("speaker_availability").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("speaker_availability").update(changes).eq("speaker_id", original.speaker_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("speaker_availability").delete().eq("speaker_id", original.speaker_id);
    },
  })
);
