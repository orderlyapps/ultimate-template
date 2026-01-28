import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { publisherSchema } from "@tanstack-db/publisher/publisherSchema";

export const publisherCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["publisher"],
    queryFn: async () => {
      // const congregation_id = localStorage.getItem("congregationId");

      const { data, error } = await supabase
        .from("publisher")
        .select("*")
        .order("last_name", { ascending: true })
        .order("display_name", { ascending: true })
        .order("first_name", { ascending: true });
      // .eq("congregation_id", congregation_id);

      if (error) {
        throw new Error(`Failed to fetch publisher: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: publisherSchema,
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("publisher").insert(changes);
    },
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("publisher").update(changes).eq("id", original.id);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("publisher").delete().eq("id", original.id);
    },
  })
);
