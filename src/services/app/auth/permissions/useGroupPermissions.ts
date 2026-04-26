import { useUserPermissions } from "./useUserPermissions";
import type { GroupPermissionResult } from "./types";

/**
 * Checks permissions for a specific group.
 * Congregation admins automatically have full access to all groups in their congregation.
 * Otherwise checks report_permission table entries.
 *
 * @param groupId - The group ID to check permissions for
 * @param groupCongregationId - Optional congregation ID of the group (to check if congregation admin has access)
 * @returns GroupPermissionResult with canRead and canEdit booleans
 */
export const useGroupPermissions = (
  groupId: string,
  groupCongregationId?: string
): GroupPermissionResult => {
  const {
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    groupPermissions,
    isLoading,
  } = useUserPermissions();

  // Loading state - deny access until loaded
  if (isLoading) {
    return { canRead: false, canEdit: false };
  }

  // Super admins have full access to everything
  if (isSuperAdmin) {
    return { canRead: true, canEdit: true };
  }

  // Congregation admins have full access to all groups in their congregation
  if (isCongregationAdmin && groupCongregationId) {
    // Check if the group belongs to the admin's congregation
    if (groupCongregationId === congregationId) {
      return { canRead: true, canEdit: true };
    }
  }

  // Check specific group permissions from report_permission table
  const groupPermission = groupPermissions.find((gp) => gp.group_id === groupId);

  if (!groupPermission) {
    return { canRead: false, canEdit: false };
  }

  return {
    canRead: groupPermission.can_read,
    canEdit: groupPermission.can_edit,
  };
};
