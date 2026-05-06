import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { speakerOutlineSchema } from "@tanstack-db/speaker_outline/speakerOutlineSchema";
import { persistence } from "@tanstack-db/persistence";

const baseOptions = queryCollectionOptions({
  id: "speaker_outline",
    queryKey: ["speaker_outline"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("speaker_outline")
        .select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.speaker_id + item.outline_id,
    schema: speakerOutlineSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("speaker_outline").insert(changes);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("speaker_outline")
        .delete()
        .eq("speaker_id", original.speaker_id)
        .eq("outline_id", original.outline_id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const speakerOutlineCollection = createCollection({
  ...persistedOptions,
  schema: speakerOutlineSchema,
});
