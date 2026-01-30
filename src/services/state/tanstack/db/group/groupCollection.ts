import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { groupSchema } from "@tanstack-db/group/groupSchema";

export const groupCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["group"],
    queryFn: async () => {
      const congregation_id = localStorage.getItem("congregationId");
      const { data, error } = await supabase
        .from("group")
        .select("*")
        .eq("congregation_id", congregation_id);

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
      await supabase.from("group").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("group").update(changes).eq("id", original.id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("group").delete().eq("id", original.id);
    },
  })
);
