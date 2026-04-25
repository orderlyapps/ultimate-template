import { supabase } from "@supabase-db/client";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { authUserCollection } from "@tanstack-db/auth-user/authUserCollection";

/**
 * Calls the `create_publisher_auth_user` Postgres RPC to provision a
 * passwordless auth.users row for the given publisher, insert a matching
 * `auth_user` row, and set `publisher.auth_id`.
 *
 * Returns the new auth user id on success.
 */
export const useCreatePublisherAuthUser = () => {
  const createAuthUser = async (publisherId: string): Promise<string> => {
    const { data, error } = await supabase.rpc("create_publisher_auth_user", {
      p_publisher_id: publisherId,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Refresh the affected collections so UI updates immediately.
    await Promise.all([
      publisherCollection.utils.refetch(),
      authUserCollection.utils.refetch(),
    ]);

    return data as string;
  };

  return { createAuthUser };
};
