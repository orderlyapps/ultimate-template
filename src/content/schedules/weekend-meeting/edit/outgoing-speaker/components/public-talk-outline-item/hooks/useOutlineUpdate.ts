import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { useOutgoingSpeakerStore } from "../../../store/useOutgoingSpeakerStore";

/**
 * Hook that provides a function to persist an outline change to the database.
 * Uses the composite key (week_id + congregation_id) to update the collection.
 * Also syncs the local store assignment so the UI reflects the change immediately.
 */
export const useOutlineUpdate = () => {
  const weekId = useOutgoingSpeakerStore((state) => state.weekId);
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);

  /**
   * Persists the new outline_id to the database and updates local store state.
   * @param outlineId - The ID of the newly selected outline
   * @param outlineTheme - The theme of the newly selected outline (for local state)
   */
  const updateOutline = (outlineId: string, outlineTheme: string) => {
    if (!weekId || !assignment?.targetCongregationId) return;

    const key = weekId + assignment.targetCongregationId;

    speakerAssignmentCollection.update(key, (draft) => {
      draft.outline_id = outlineId;
    });

    setAssignment({ ...assignment, outlineId, outlineTheme });
  };

  return { updateOutline };
};
