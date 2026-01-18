import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { mapSchema } from "@tanstack-db/map/mapSchema";

export const mapCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["map"],
    queryFn: async () => {
      const { data, error } = await supabase.from("map").select("*");

      if (error) {
        throw new Error(`Failed to fetch map: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: mapSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("map").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("map").update(changes).eq("id", original.id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("map").delete().eq("id", original.id);
    },
  })
);
