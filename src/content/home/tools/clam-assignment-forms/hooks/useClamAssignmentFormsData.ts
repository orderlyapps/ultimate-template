import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

/**
 * Fetches meeting data and student part assignments for the given week.
 * Returns the meeting record and a helper to look up a participant by assignment_id.
 *
 * @param week_id - ISO date string (YYYY-MM-DD) for the Monday of the target week
 */
export function useClamAssignmentFormsData(week_id: string) {
  const { data: meetingData } = useLiveQuery(
    (q) =>
      q
        .from({ m: midweekMeetingDataCollection })
        .where(({ m }) => eq(m.week_id, week_id)),
    [week_id],
  );

  const { data: assignmentData } = useLiveQuery(
    (q) =>
      q
        .from({ a: midweekAssignmentCollection })
        .join({ p: publisherCollection }, ({ a, p }) => eq(a.participant_id, p.id))
        .where(({ a }) => eq(a.week_id, week_id))
        .select(({ a, p }) => ({
          assignment_id: a.assignment_id,
          participant: p,
        })),
    [week_id],
  );

  const meeting = meetingData?.[0];

  /** Look up participant by assignment_id */
  const participant = (assignment_id: string) =>
    assignmentData?.find((d) => d.assignment_id === assignment_id)?.participant;

  const hasSecondSchool = !!assignmentData?.find(
    (d) => d.assignment_id === "chairman_2",
  );

  return { meeting, participant, hasSecondSchool };
}
