import { useLiveQuery } from "@tanstack/react-db";
import { cleanMajorCollection } from "@tanstack-db/clean_major/cleanMajorCollection";
import { cleanMinorCollection } from "@tanstack-db/clean_minor/cleanMinorCollection";
import { useUserPermissions } from "@services/app/auth/permissions/useUserPermissions";

interface CleanAssignment {
  week_id: string;
  congregation_id: string;
  group_id: string;
}

interface UseCleanAssignmentsReturn {
  majorAssignments: CleanAssignment[];
  minorAssignments: CleanAssignment[];
  canEdit: boolean;
  congregationId: string | null;
  isLoading: boolean;
  setMajorAssignment: (weekId: string, groupId: string) => Promise<void>;
  setMinorAssignment: (weekId: string, groupId: string) => Promise<void>;
  deleteMajorAssignment: (weekId: string) => Promise<void>;
  deleteMinorAssignment: (weekId: string) => Promise<void>;
}

/**
 * Hook for managing clean table assignments.
 * Fetches assignments and provides CRUD operations.
 */
export function useCleanAssignments(): UseCleanAssignmentsReturn {
  const {
    isSuperAdmin,
    isCongregationAdmin,
    congregationId,
    cleanPermissions,
    isLoading: isPermissionsLoading,
  } = useUserPermissions();

  const { data: cleanMajor, isLoading: isMajorLoading } = useLiveQuery((q) =>
    q.from({ cm: cleanMajorCollection })
  );
  const { data: cleanMinor, isLoading: isMinorLoading } = useLiveQuery((q) =>
    q.from({ cmn: cleanMinorCollection })
  );

  const canEdit =
    isSuperAdmin ||
    isCongregationAdmin ||
    cleanPermissions.some((cp) => cp.can_edit);

  const isLoading = isPermissionsLoading || isMajorLoading || isMinorLoading;

  // Filter assignments for user's congregation
  const majorAssignments =
    cleanMajor?.filter((cm) => cm.congregation_id === congregationId) ?? [];
  const minorAssignments =
    cleanMinor?.filter((cm) => cm.congregation_id === congregationId) ?? [];

  const setMajorAssignment = async (weekId: string, groupId: string) => {
    if (!congregationId) return;

    // Check if assignment already exists
    const existing = majorAssignments.find(
      (a) => a.week_id === weekId && a.congregation_id === congregationId
    );

    if (existing) {
      // Update existing - key is congregation_id + week_id
      const key = congregationId + weekId;
      cleanMajorCollection.update(key, (draft) => {
        draft.group_id = groupId;
      });
    } else {
      // Insert new
      cleanMajorCollection.insert({
        week_id: weekId,
        congregation_id: congregationId,
        group_id: groupId,
      });
    }
  };

  const setMinorAssignment = async (weekId: string, groupId: string) => {
    if (!congregationId) return;

    // Check if assignment already exists
    const existing = minorAssignments.find(
      (a) => a.week_id === weekId && a.congregation_id === congregationId
    );

    if (existing) {
      // Update existing - key is congregation_id + week_id
      const key = congregationId + weekId;
      cleanMinorCollection.update(key, (draft) => {
        draft.group_id = groupId;
      });
    } else {
      // Insert new
      cleanMinorCollection.insert({
        week_id: weekId,
        congregation_id: congregationId,
        group_id: groupId,
      });
    }
  };

  const deleteMajorAssignment = async (weekId: string) => {
    if (!congregationId) return;
    const key = congregationId + weekId;
    cleanMajorCollection.delete(key);
  };

  const deleteMinorAssignment = async (weekId: string) => {
    if (!congregationId) return;
    const key = congregationId + weekId;
    cleanMinorCollection.delete(key);
  };

  return {
    majorAssignments,
    minorAssignments,
    canEdit,
    congregationId,
    isLoading,
    setMajorAssignment,
    setMinorAssignment,
    deleteMajorAssignment,
    deleteMinorAssignment,
  };
}
