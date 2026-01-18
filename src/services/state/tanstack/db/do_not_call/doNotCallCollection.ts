import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { doNotCallSchema } from "@tanstack-db/do_not_call/doNotCallSchema";

export const doNotCallCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["do_not_call"],
    queryFn: async () => {
      const { data, error } = await supabase.from("do_not_call").select("*");

      if (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
      }

      return data;
    },
    queryClient,
    getKey: (item) => item.id,
    schema: doNotCallSchema,
    
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("do_no_call").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase.from("do_no_call").update(changes).eq("id", original.id);
    },
    
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase.from("do_no_call").delete().eq("id", original.id);
    },
  }),
);
