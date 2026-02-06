import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { groupSchema } from "@tanstack-db/group/groupSchema";

export const groupCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["group"],
    queryFn: async () => {
      const { data, error } = await supabase.from("group").select("*");

      if (error) {
        throw new Error(`Failed to fetch group: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: groupSchema,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      const { data, error } = await supabase.from("group").insert(changes);

      if (error) {
        return error;
      }

      return data;
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("group")
        .update(changes)
        .eq("id", original.id);

      if (error) {
        return error;
      }

      return data;
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      const { data, error } = await supabase
        .from("group")
        .delete()
        .eq("id", original.id);

      if (error) {
        return error;
      }

      return data;
    },
  }),
);
