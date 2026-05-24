import { useCallback, useMemo } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { secretaryPermissionCollection } from "@tanstack-db/secretary-permission/secretaryPermissionCollection";
import { useAuth } from "@services/app/auth/useAuth";
import type { SecretaryPermission } from "@tanstack-db/secretary-permission/secretaryPermissionSchema";

/**
 * Hook to manage secretary permissions for a user.
 * Allows granting or revoking the secretary permission for a congregation.
 */
export const useManageSecretaryPermissions = (authUserId: string | null) => {
  const { user } = useAuth();
  const currentUserId = user?.id;

  const { data: secretaryPermissions } = useLiveQuery((q) =>
    q.from({ sp: secretaryPermissionCollection })
  );

  /** All secretary permissions for the target auth user */
  const userPermissions = useMemo(
    () =>
      secretaryPermissions?.filter((sp) => sp.auth_user_id === authUserId) ??
      [],
    [secretaryPermissions, authUserId]
  );

  /**
   * Get permission for a specific congregation
   */
  const getCongregationPermission = useCallback(
    (congregationId: string): SecretaryPermission | undefined => {
      return userPermissions.find((sp) => sp.congregation_id === congregationId);
    },
    [userPermissions]
  );

  /**
   * Toggle the secretary permission for a congregation on or off
   */
  const setCongregationPermission = useCallback(
    async (congregationId: string, enabled: boolean): Promise<boolean> => {
      if (!authUserId || !currentUserId) {
        return false;
      }

      const existing = getCongregationPermission(congregationId);

      if (enabled && !existing) {
        const { error } = await supabase.from("secretary_permission").insert({
          auth_user_id: authUserId,
          congregation_id: congregationId,
          granted_by: currentUserId,
        });

        if (error) {
          console.error("Failed to grant secretary permission:", error.message);
          return false;
        }
      } else if (!enabled && existing) {
        const { error } = await supabase
          .from("secretary_permission")
          .delete()
          .eq("id", existing.id);

        if (error) {
          console.error("Failed to revoke secretary permission:", error.message);
          return false;
        }
      }

      await secretaryPermissionCollection.utils.refetch();
      return true;
    },
    [authUserId, currentUserId, getCongregationPermission]
  );

  return {
    userPermissions,
    getCongregationPermission,
    setCongregationPermission,
  };
};
