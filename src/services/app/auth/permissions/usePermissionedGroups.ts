import { useLiveQuery } from "@tanstack/react-db";
import { useUserPermissions } from "./useUserPermissions";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import type { Group } from "@tanstack-db/group/groupSchema";

/**
 * Result of the usePermissionedGroups hook
 */
export interface PermissionedGroupsResult {
  /** Groups the user has permission to access */
  groups: Group[];
  /** Whether the data is still loading */
  isLoading: boolean;
}

/**
 * Hook to fetch groups the current user has permission to read or edit.
 * - Super admins: returns ALL groups
 * - Congregation admins: returns ALL groups in their congregation
 * - Users with group permissions: returns only groups with can_read or can_edit
 * - Publishers: returns only their own group's data (handled by RLS)
 *
 * @returns PermissionedGroupsResult with filtered groups
 */
export const usePermissionedGroups = (): PermissionedGroupsResult => {
  const {
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    groupPermissions,
    isLoading: isPermissionsLoading,
  } = useUserPermissions();

  // Fetch all groups
  const { data: allGroups, isLoading: isGroupsLoading } = useLiveQuery((q) =>
    q.from({ g: groupCollection })
  );

  const isLoading = isPermissionsLoading || isGroupsLoading;

  if (isLoading || !allGroups) {
    return {
      groups: [],
      isLoading: true,
    };
  }

  // Super admins see all groups
  if (isSuperAdmin) {
    return {
      groups: allGroups,
      isLoading: false,
    };
  }

  // Congregation admins see all groups in their congregation
  if (isCongregationAdmin && congregationId) {
    const congregationGroups = allGroups.filter(
      (g) => g.congregation_id === congregationId
    );
    return {
      groups: congregationGroups,
      isLoading: false,
    };
  }

  // Regular users see only groups they have permission for
  const permittedGroupIds = new Set(
    groupPermissions
      .filter((gp) => gp.can_read || gp.can_edit)
      .map((gp) => gp.group_id)
  );

  const permittedGroups = allGroups.filter((g) => permittedGroupIds.has(g.id));

  return {
    groups: permittedGroups,
    isLoading: false,
  };
};
