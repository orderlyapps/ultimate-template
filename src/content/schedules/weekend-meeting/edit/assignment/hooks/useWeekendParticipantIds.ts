import { useLiveQuery, eq } from "@tanstack/react-db";
import { weekendParticipationCollection } from "@tanstack-db/weekend_participation/weekendParticipationCollection";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

export const useWeekendParticipantIds = (assignmentId: WeekendAssignmentID | undefined) => {
  const { data: participations } = useLiveQuery(
    (q) =>
      q
        .from({ wp: weekendParticipationCollection })
        .where(({ wp }) => eq(wp.participation_id, assignmentId ?? "")),
    [assignmentId]
  );

  const participantIds = new Set(
    participations?.map((p) => p.participant_id) ?? []
  );

  return participantIds;
};
