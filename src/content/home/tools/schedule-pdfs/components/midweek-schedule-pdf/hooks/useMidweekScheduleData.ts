import { and, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import type { MidweekMeetingData } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

/**
 * Data for a single week in the midweek schedule
 */
export type WeekScheduleData = {
  weekId: string;
  meetingData: MidweekMeetingData;
  assignments: Map<string, Publisher | undefined>;
};

/**
 * Hook to fetch all midweek meeting data and assignments for a date range.
 * Returns the meeting data for each week in the range, combined with publisher assignments.
 *
 * @param dateRange - Object containing firstMonday and lastMonday ISO date strings
 * @returns Object with weeks array (sorted by week_id) and isLoading flag
 */
export function useMidweekScheduleData(dateRange: {
  firstMonday: string;
  lastMonday: string;
}): {
  weeks: WeekScheduleData[];
  publishers: Publisher[];
  isLoading: boolean;
} {
  // Fetch meeting data for weeks in the selected month range
  const { data: meetingData } = useLiveQuery(
    (q) =>
      q
        .from({ m: midweekMeetingDataCollection })
        .where(({ m }) =>
          and(
            gte(m.week_id, dateRange.firstMonday),
            lte(m.week_id, dateRange.lastMonday),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday],
  );

  // Fetch all assignments for these weeks
  const { data: assignments } = useLiveQuery(
    (q) =>
      q
        .from({ a: midweekAssignmentCollection })
        .where(({ a }) =>
          and(
            gte(a.week_id, dateRange.firstMonday),
            lte(a.week_id, dateRange.lastMonday),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday],
  );

  // Fetch all publishers to resolve names
  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  // Build a lookup map for publishers by ID
  const publisherMap = new Map<string, Publisher>();
  for (const publisher of publishers ?? []) {
    publisherMap.set(publisher.id, publisher);
  }

  // Group assignments by week_id
  const assignmentsByWeek = new Map<string, MidweekAssignment[]>();
  for (const assignment of assignments ?? []) {
    const existing = assignmentsByWeek.get(assignment.week_id) ?? [];
    existing.push(assignment);
    assignmentsByWeek.set(assignment.week_id, existing);
  }

  // Build the weeks array with meeting data and resolved assignments
  const weeks: WeekScheduleData[] = [];
  for (const meeting of meetingData ?? []) {
    const weekAssignments = assignmentsByWeek.get(meeting.week_id) ?? [];
    const assignmentMap = new Map<string, Publisher | undefined>();

    for (const assignment of weekAssignments) {
      const publisher = publisherMap.get(assignment.participant_id);
      assignmentMap.set(assignment.assignment_id, publisher);
    }

    weeks.push({
      weekId: meeting.week_id,
      meetingData: meeting,
      assignments: assignmentMap,
    });
  }

  // Sort weeks by week_id (chronological order)
  weeks.sort((a, b) => a.weekId.localeCompare(b.weekId));

  const isLoading =
    meetingData === undefined ||
    assignments === undefined ||
    publishers === undefined;

  return { weeks, publishers: publishers ?? [], isLoading };
}
