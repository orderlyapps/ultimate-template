import { useCallback, useMemo } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { cleanPermissionCollection } from "@tanstack-db/clean-permission/cleanPermissionCollection";
import { useAuth } from "@services/app/auth/useAuth";
import type { CleanPermission } from "@tanstack-db/clean-permission/cleanPermissionSchema";

/**
 * Hook to manage clean permissions for a user.
 * Allows granting edit access to specific congregations.
 */
export const useManageCleanPermissions = (authUserId: string | null) => {
  const { user } = useAuth();
  const currentUserId = user?.id;

  // Fetch existing permissions for this user
  const { data: cleanPermissions } = useLiveQuery((q) =>
    q.from({ cp: cleanPermissionCollection })
  );

  const userPermissions = useMemo(
    () => cleanPermissions?.filter((cp) => cp.auth_user_id === authUserId) ?? [],
    [cleanPermissions, authUserId]
  );

  /**
   * Get permission for a specific congregation
   */
  const getCongregationPermission = useCallback(
    (congregationId: string): CleanPermission | undefined => {
      return userPermissions.find((cp) => cp.congregation_id === congregationId);
    },
    [userPermissions]
  );

  /**
   * Set permissions for a congregation (create or update)
   */
  const setCongregationPermission = useCallback(
    async (
      congregationId: string,
      canEdit: boolean
    ): Promise<boolean> => {
      if (!authUserId || !currentUserId) {
        return false;
      }

      const existing = getCongregationPermission(congregationId);

      if (existing) {
        // Update existing permission
        const { error } = await supabase
          .from("clean_permission")
          .update({
            can_edit: canEdit,
          })
          .eq("id", existing.id);

        if (error) {
          console.error("Failed to update permission:", error.message);
          return false;
        }
      } else {
        // Create new permission
        const { error } = await supabase.from("clean_permission").insert({
          auth_user_id: authUserId,
          congregation_id: congregationId,
          can_edit: canEdit,
          granted_by: currentUserId,
        });

        if (error) {
          console.error("Failed to create permission:", error.message);
          return false;
        }
      }

      // Refresh collection
      await cleanPermissionCollection.utils.refetch();
      return true;
    },
    [authUserId, currentUserId, getCongregationPermission]
  );

  /**
   * Remove permission for a congregation
   */
  const removeCongregationPermission = useCallback(
    async (congregationId: string): Promise<boolean> => {
      if (!authUserId) {
        return false;
      }

      const existing = getCongregationPermission(congregationId);
      if (!existing) {
        return true;
      }

      const { error } = await supabase
        .from("clean_permission")
        .delete()
        .eq("id", existing.id);

      if (error) {
        console.error("Failed to remove permission:", error.message);
        return false;
      }

      // Refresh collection
      await cleanPermissionCollection.utils.refetch();
      return true;
    },
    [authUserId, getCongregationPermission]
  );

  return {
    userPermissions,
    getCongregationPermission,
    setCongregationPermission,
    removeCongregationPermission,
  };
};
