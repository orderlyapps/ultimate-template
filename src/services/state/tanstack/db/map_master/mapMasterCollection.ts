import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { mapMasterSchema } from "@tanstack-db/map_master/mapMasterSchema";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

export const mapMasterCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["map_master"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("map_master")
        .select("*")
        .eq("congregation_id", getUserCongregation()?.id);

      if (error) {
        throw new Error(`Failed to fetch map master: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.congregation_id,
    schema: mapMasterSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("map_master").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("map_master")
        .update(changes)
        .eq("congregation_id", original.congregation_id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("map_master")
        .delete()
        .eq("congregation_id", original.congregation_id);
    },
  }),
);
