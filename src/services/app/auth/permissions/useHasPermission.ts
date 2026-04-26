import { useUserPermissions } from "./useUserPermissions";
import type { PermissionCheck, GroupPermissionResult } from "./types";

/**
 * Generic hook for checking permissions.
 * Supports role-based checks (super_admin, congregation_admin) and
 * resource-specific checks (read:report, edit:report) with optional groupId.
 *
 * @param permission - The permission to check
 * @param groupId - Optional group ID for report permissions
 * @param groupCongregationId - Optional congregation ID of the group
 * @returns boolean indicating if user has the permission
 *
 * @example
 * // Check if super admin
 * const isSuperAdmin = useHasPermission('super_admin');
 *
 * @example
 * // Check if can read reports for a specific group
 * const canRead = useHasPermission('read:report', 'group-uuid', 'congregation-uuid');
 */
export const useHasPermission = (
  permission: PermissionCheck,
  groupId?: string,
  groupCongregationId?: string
): boolean => {
  const {
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    groupPermissions,
    isLoading,
  } = useUserPermissions();

  // Always compute group permissions (called unconditionally for hook rules)
  const groupPermissionResult: GroupPermissionResult = computeGroupPermissions(
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    groupCongregationId,
    groupPermissions,
    groupId
  );

  // Loading state - deny access until loaded
  if (isLoading) {
    return false;
  }

  // Role-based checks
  switch (permission) {
    case "super_admin":
      return isSuperAdmin;

    case "congregation_admin":
      return isCongregationAdmin || isSuperAdmin;

    case "read:report":
      // If no group specified, check if user has ANY read permission
      if (!groupId) {
        return (
          isSuperAdmin ||
          isCongregationAdmin ||
          groupPermissions.some((gp) => gp.can_read)
        );
      }
      return groupPermissionResult.canRead;

    case "edit:report":
      // If no group specified, check if user has ANY edit permission
      if (!groupId) {
        return (
          isSuperAdmin ||
          isCongregationAdmin ||
          groupPermissions.some((gp) => gp.can_edit)
        );
      }
      return groupPermissionResult.canEdit;

    default:
      return false;
  }
};

/**
 * Compute group permissions without using hooks (pure function)
 */
const computeGroupPermissions = (
  isSuperAdmin: boolean,
  isCongregationAdmin: boolean,
  userCongregationId: string | null,
  groupCongregationId: string | undefined,
  groupPermissions: Array<{ group_id: string; can_read: boolean; can_edit: boolean }>,
  groupId: string | undefined
): GroupPermissionResult => {
  // Super admins have full access
  if (isSuperAdmin) {
    return { canRead: true, canEdit: true };
  }

  // Congregation admins have full access to all groups in their congregation
  if (isCongregationAdmin && groupCongregationId && groupCongregationId === userCongregationId) {
    return { canRead: true, canEdit: true };
  }

  // Check specific group permissions from report_permission table
  if (!groupId) {
    return { canRead: false, canEdit: false };
  }

  const groupPermission = groupPermissions.find((gp) => gp.group_id === groupId);

  if (!groupPermission) {
    return { canRead: false, canEdit: false };
  }

  return {
    canRead: groupPermission.can_read,
    canEdit: groupPermission.can_edit,
  };
};
