import { useLiveQuery, eq, and } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { useWeekendMeetingEditStore } from "@/content/schedules/weekend-meeting/edit/store/useWeekendMeetingEditStore";

/**
 * Queries the current speaker assignment for the active weekId + congregationId
 * from the weekend meeting edit store.
 * Returns the current speakerId and outlineId if an assignment exists.
 */
export function useCurrentAssignment() {
  const weekId = useWeekendMeetingEditStore((s) => s.weekId);
  const congregationId = useWeekendMeetingEditStore((s) => s.congregationId);

  const { data: assignments = [] } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .where(({ sa }) =>
          and(
            eq(sa.week_id, weekId),
            eq(sa.congregation_id, congregationId ?? ""),
          ),
        )
        .select(({ sa }) => ({
          speakerId: sa.speaker_id,
          outlineId: sa.outline_id,
        })),
    [weekId, congregationId],
  );

  const current = assignments[0];

  return {
    currentSpeakerId: current?.speakerId ?? null,
    currentOutlineId: current?.outlineId ?? null,
  };
}
