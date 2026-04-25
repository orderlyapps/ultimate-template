import { useLiveQuery } from "@tanstack/react-db";
import { authUserCollection } from "@tanstack-db/auth-user/authUserCollection";
import { useAuth } from "@services/app/auth/useAuth";

/**
 * Returns whether the currently signed-in user is a super admin.
 *
 * Reads from the `auth_user` collection (RLS-restricted) and matches the
 * row whose `auth_user_id` equals the current `auth.users.id`.
 */
export const useIsSuperAdmin = (): boolean => {
  const { user } = useAuth();

  const { data } = useLiveQuery((q) =>
    q.from({ a: authUserCollection }),
  );

  if (!user?.id || !data) return false;

  const row = data.find((r) => r.auth_user_id === user.id);
  return !!row?.is_super_admin;
};
