import { useLiveQuery } from "@tanstack/react-db";
import { useAuth } from "@services/app/auth/useAuth";
import { authUserCollection } from "@tanstack-db/auth-user/authUserCollection";
import { congregationAdminCollection } from "@tanstack-db/congregation-admin/congregationAdminCollection";
import { reportPermissionCollection } from "@tanstack-db/report-permission/reportPermissionCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import type { UserPermissions, GroupPermission } from "./types";

/**
 * Fetches and consolidates all permissions for the current user.
 * Combines super_admin status, congregation_admin status, and group-level permissions.
 *
 * @returns UserPermissions object with isSuperAdmin, isCongregationAdmin, congregationId, groupPermissions, and isLoading
 */
export const useUserPermissions = (): UserPermissions => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const currentUserId = user?.id;

  // Fetch auth_user data for super_admin status
  const { data: authUsers, isLoading: isAuthUserLoading } = useLiveQuery((q) =>
    q.from({ a: authUserCollection })
  );

  // Fetch congregation_admin data
  const { data: congregationAdmins, isLoading: isCongregationAdminLoading } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection })
  );

  // Fetch report_permission data
  const { data: reportPermissions, isLoading: isReportPermissionLoading } = useLiveQuery((q) =>
    q.from({ rp: reportPermissionCollection })
  );

  // Fetch publisher data to get congregation_id
  const { data: publishers, isLoading: isPublisherLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection })
  );

  const isLoading =
    isAuthLoading ||
    isAuthUserLoading ||
    isCongregationAdminLoading ||
    isReportPermissionLoading ||
    isPublisherLoading;

  // Not authenticated
  if (!currentUserId) {
    return {
      isSuperAdmin: false,
      isCongregationAdmin: false,
      congregationId: null,
      groupPermissions: [],
      isLoading,
    };
  }

  // Check super_admin status
  const authUser = authUsers?.find((au) => au.auth_user_id === currentUserId);
  const isSuperAdmin = authUser?.is_super_admin ?? false;

  // Check congregation_admin status and get congregation_id
  const congregationAdmin = congregationAdmins?.find(
    (ca) => ca.auth_user_id === currentUserId
  );
  const isCongregationAdmin = !!congregationAdmin;

  // Get congregation_id from publisher record
  const userPublisher = publishers?.find((p) => p.auth_id === currentUserId);
  const congregationId = userPublisher?.congregation_id ?? null;

  // Get group-level permissions for current user
  const userGroupPermissions: GroupPermission[] =
    reportPermissions
      ?.filter((rp) => rp.auth_user_id === currentUserId)
      .map((rp) => ({
        group_id: rp.group_id,
        can_read: rp.can_read,
        can_edit: rp.can_edit,
      })) ?? [];

  return {
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    groupPermissions: userGroupPermissions,
    isLoading,
  };
};
