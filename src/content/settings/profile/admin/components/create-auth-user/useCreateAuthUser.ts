import { useState } from "react";
import { supabase } from "@supabase-db/client";

/**
 * Calls the `create_publisher_auth_user` Postgres RPC.
 * Returns the new auth UUID on success or throws on error.
 */
export const useCreateAuthUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAuthUser = async (publisherId: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    const { data, error: rpcError } = await supabase.rpc(
      "create_publisher_auth_user",
      { publisher_id: publisherId },
    );

    setIsLoading(false);

    if (rpcError) {
      setError(rpcError.message);
      throw new Error(rpcError.message);
    }

    return data as string;
  };

  return { createAuthUser, isLoading, error };
};
