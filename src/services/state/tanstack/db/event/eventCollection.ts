import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { eventSchema } from "@tanstack-db/event/eventSchema";

export const eventCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["event"],
    queryFn: async () => {
      const { data, error } = await supabase.from("event").select("*");

      if (error) {
        throw new Error(`Failed to fetch event: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: eventSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("event").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("event").update(changes).eq("id", original.id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("event").delete().eq("id", original.id);
    },
  }),
);
