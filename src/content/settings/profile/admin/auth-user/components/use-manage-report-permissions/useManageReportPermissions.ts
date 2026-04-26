import { useCallback, useMemo } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { reportPermissionCollection } from "@tanstack-db/report-permission/reportPermissionCollection";
import { useAuth } from "@services/app/auth/useAuth";
import type { ReportPermission } from "@tanstack-db/report-permission/reportPermissionSchema";

/**
 * Hook to manage report permissions for a user.
 * Allows granting read/edit access to specific groups.
 */
export const useManageReportPermissions = (authUserId: string | null) => {
  const { user } = useAuth();
  const currentUserId = user?.id;

  // Fetch existing permissions for this user
  const { data: reportPermissions } = useLiveQuery((q) =>
    q.from({ rp: reportPermissionCollection })
  );

  const userPermissions = useMemo(
    () => reportPermissions?.filter((rp) => rp.auth_user_id === authUserId) ?? [],
    [reportPermissions, authUserId]
  );

  /**
   * Get permission for a specific group
   */
  const getGroupPermission = useCallback(
    (groupId: string): ReportPermission | undefined => {
      return userPermissions.find((rp) => rp.group_id === groupId);
    },
    [userPermissions]
  );

  /**
   * Set permissions for a group (create or update)
   */
  const setGroupPermission = useCallback(
    async (
      groupId: string,
      canRead: boolean,
      canEdit: boolean
    ): Promise<boolean> => {
      if (!authUserId || !currentUserId) {
        return false;
      }

      const existing = getGroupPermission(groupId);

      if (existing) {
        // Update existing permission
        const { error } = await supabase
          .from("report_permission")
          .update({
            can_read: canRead,
            can_edit: canEdit,
          })
          .eq("id", existing.id);

        if (error) {
          console.error("Failed to update permission:", error.message);
          return false;
        }
      } else {
        // Create new permission
        const { error } = await supabase.from("report_permission").insert({
          auth_user_id: authUserId,
          group_id: groupId,
          can_read: canRead,
          can_edit: canEdit,
          granted_by: currentUserId,
        });

        if (error) {
          console.error("Failed to create permission:", error.message);
          return false;
        }
      }

      // Refresh collection
      await reportPermissionCollection.utils.refetch();
      return true;
    },
    [authUserId, currentUserId, getGroupPermission]
  );

  /**
   * Remove permission for a group
   */
  const removeGroupPermission = useCallback(
    async (groupId: string): Promise<boolean> => {
      if (!authUserId) {
        return false;
      }

      const existing = getGroupPermission(groupId);
      if (!existing) {
        return true;
      }

      const { error } = await supabase
        .from("report_permission")
        .delete()
        .eq("id", existing.id);

      if (error) {
        console.error("Failed to remove permission:", error.message);
        return false;
      }

      // Refresh collection
      await reportPermissionCollection.utils.refetch();
      return true;
    },
    [authUserId, getGroupPermission]
  );

  return {
    userPermissions,
    getGroupPermission,
    setGroupPermission,
    removeGroupPermission,
  };
};
