import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { authUserSchema } from "@tanstack-db/auth-user/authUserSchema";
import { persistence } from "@tanstack-db/persistence";

const baseOptions = queryCollectionOptions({
  id: "auth_user",
    queryKey: ["auth_user"],

    queryFn: async () => {
      const { data, error } = await supabase.from("auth_user").select("*");

      if (error) {
        throw new Error(`Failed to fetch auth_user: ${error.message}`);
      }

      return data;
    },

    queryClient,

    schema: authUserSchema,

    getKey: (authUser) => authUser.auth_user_id,

    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      await supabase.from("auth_user").insert(changes);
    },

    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("auth_user")
        .update(changes)
        .eq("auth_user_id", original.auth_user_id);
    },

    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      await supabase
        .from("auth_user")
        .delete()
        .eq("auth_user_id", original.auth_user_id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const authUserCollection = createCollection({
  ...persistedOptions,
  schema: authUserSchema,
});
