import { useCallback } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { supabase } from "@supabase-db/client";
import { congregationAdminCollection } from "@tanstack-db/congregation-admin/congregationAdminCollection";
import { useAuth } from "@services/app/auth/useAuth";

/**
 * Hook to manage congregation admin status for a user.
 * Only super admins can add/remove congregation admin status.
 */
export const useManageCongregationAdmin = (authUserId: string | null, congregationId: string | null) => {
  const { user } = useAuth();
  const currentUserId = user?.id;

  // Check if target user is already a congregation admin
  const { data: congregationAdmins } = useLiveQuery((q) =>
    q.from({ ca: congregationAdminCollection })
  );

  const existingRecord = congregationAdmins?.find(
    (ca) => ca.auth_user_id === authUserId && ca.congregation_id === congregationId
  );

  const isCongregationAdmin = !!existingRecord;

  /**
   * Add the user as a congregation admin
   */
  const addCongregationAdmin = useCallback(async (): Promise<boolean> => {
    if (!authUserId || !congregationId || !currentUserId) {
      return false;
    }

    const { error } = await supabase.from("congregation_admin").insert({
      auth_user_id: authUserId,
      congregation_id: congregationId,
      created_by: currentUserId,
    });

    if (error) {
      console.error("Failed to add congregation admin:", error.message);
      return false;
    }

    // Refresh collection
    await congregationAdminCollection.utils.refetch();
    return true;
  }, [authUserId, congregationId, currentUserId]);

  /**
   * Remove the user's congregation admin status
   */
  const removeCongregationAdmin = useCallback(async (): Promise<boolean> => {
    if (!authUserId || !congregationId) {
      return false;
    }

    const { error } = await supabase
      .from("congregation_admin")
      .delete()
      .eq("auth_user_id", authUserId)
      .eq("congregation_id", congregationId);

    if (error) {
      console.error("Failed to remove congregation admin:", error.message);
      return false;
    }

    // Refresh collection
    await congregationAdminCollection.utils.refetch();
    return true;
  }, [authUserId, congregationId]);

  return {
    isCongregationAdmin,
    addCongregationAdmin,
    removeCongregationAdmin,
  };
};
