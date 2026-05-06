import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { supabase } from "@supabase-db/client";
import { queryClient } from "@tanstack-query/client";
import { authOtpLogSchema } from "@tanstack-db/auth-otp-log/authOtpLogSchema";
import { persistence } from "@tanstack-db/persistence";

const baseOptions = queryCollectionOptions({
  id: "auth_otp_log",
    queryKey: ["auth_otp_log"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("auth_otp_log")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch auth_otp_log: ${error.message}`);
      }

      return data;
    },
    queryClient,
    schema: authOtpLogSchema,
    getKey: (row) => row.id,
    onUpdate: async ({ transaction }) => {
      const { changes, original } = transaction.mutations[0];
      await supabase
        .from("auth_otp_log")
        .update(changes)
        .eq("id", original.id);
    },
  });

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 1,
});

export const authOtpLogCollection = createCollection({
  ...persistedOptions,
  schema: authOtpLogSchema,
});
