import { eq, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { differenceInWeeks, parseISO } from "date-fns";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

export type AssignmentHistoryItem = {
  week_id: string;
  assignment_type: "weekend" | "speaker";
  assignment_id: string;
};

export type PublisherAssignmentHistory = {
  weeksSinceSameAssignment: number | null;
  weeksSinceAnyAssignment: number | null;
  weeksUntilSameAssignment: number | null;
  weeksUntilAnyAssignment: number | null;
  avgWeeksBetweenSameAssignment: number | null;
  avgWeeksBetweenAnyAssignment: number | null;
  pastAssignments: AssignmentHistoryItem[];
  currentWeekAssignments: AssignmentHistoryItem[];
  futureAssignments: AssignmentHistoryItem[];
};

export const usePublisherAssignmentHistory = (
  publisherId: string,
  weekId: string,
  assignmentId: WeekendAssignmentID | null,
): PublisherAssignmentHistory => {
  const congregationId = getUserCongregation()?.id ?? "";

  const { data: weekendAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .where(({ wa }) => eq(wa.congregation_id, congregationId))
        .select(({ wa }) => ({
          participant_id: wa.participant_id,
          assignment_id: wa.assignment_id,
          week_id: wa.week_id,
        })),
    [congregationId],
  );

  const { data: speakerAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .where(({ sa }) => eq(sa.congregation_id, congregationId))
        .select(({ sa }) => ({
          speaker_id: sa.speaker_id,
          week_id: sa.week_id,
        })),
    [congregationId],
  );

  if (!publisherId || !weekId || !assignmentId) {
    return {
      weeksSinceSameAssignment: null,
      weeksSinceAnyAssignment: null,
      weeksUntilSameAssignment: null,
      weeksUntilAnyAssignment: null,
      avgWeeksBetweenSameAssignment: null,
      avgWeeksBetweenAnyAssignment: null,
      pastAssignments: [],
      currentWeekAssignments: [],
      futureAssignments: [],
    };
  }

  const selectedWeekDate = parseISO(weekId);

  const publisherWeekendAssignments =
    weekendAssignments?.filter((wa) => wa.participant_id === publisherId) ?? [];
  const publisherSpeakerAssignments =
    speakerAssignments?.filter((sa) => sa.speaker_id === publisherId) ?? [];

  const allAssignments: AssignmentHistoryItem[] = [
    ...publisherWeekendAssignments.map((wa) => ({
      week_id: wa.week_id,
      assignment_type: "weekend" as const,
      assignment_id: wa.assignment_id,
    })),
    ...publisherSpeakerAssignments.map((sa) => ({
      week_id: sa.week_id,
      assignment_type: "speaker" as const,
      assignment_id: "speaker",
    })),
  ].sort((a, b) => b.week_id.localeCompare(a.week_id));

  const pastAssignments = allAssignments
    .filter((a) => a.week_id < weekId)
    .slice(0, 5);

  const currentWeekAssignments = allAssignments.filter(
    (a) => a.week_id === weekId,
  );

  const futureAssignments = allAssignments
    .filter((a) => a.week_id > weekId)
    .reverse();

  const sameAssignmentWeeks = publisherWeekendAssignments
    .filter((wa) => wa.assignment_id === assignmentId && wa.week_id < weekId)
    .map((wa) => wa.week_id)
    .sort()
    .reverse();

  const allPastWeeks = [
    ...publisherWeekendAssignments
      .filter((wa) => wa.week_id < weekId)
      .map((wa) => wa.week_id),
    ...publisherSpeakerAssignments
      .filter((sa) => sa.week_id < weekId)
      .map((sa) => sa.week_id),
  ];
  const uniqueAllPastWeeks = [...new Set(allPastWeeks)].sort().reverse();

  const weeksSinceSameAssignment =
    sameAssignmentWeeks.length > 0
      ? differenceInWeeks(selectedWeekDate, parseISO(sameAssignmentWeeks[0]))
      : null;

  const weeksSinceAnyAssignment =
    uniqueAllPastWeeks.length > 0
      ? differenceInWeeks(selectedWeekDate, parseISO(uniqueAllPastWeeks[0]))
      : null;

  const avgWeeksBetweenSameAssignment = calculateAverageGap(sameAssignmentWeeks);
  const avgWeeksBetweenAnyAssignment = calculateAverageGap(uniqueAllPastWeeks);

  const futureSameAssignmentWeeks = publisherWeekendAssignments
    .filter((wa) => wa.assignment_id === assignmentId && wa.week_id > weekId)
    .map((wa) => wa.week_id)
    .sort();

  const allFutureWeeks = [
    ...publisherWeekendAssignments
      .filter((wa) => wa.week_id > weekId)
      .map((wa) => wa.week_id),
    ...publisherSpeakerAssignments
      .filter((sa) => sa.week_id > weekId)
      .map((sa) => sa.week_id),
  ];
  const uniqueAllFutureWeeks = [...new Set(allFutureWeeks)].sort();

  const weeksUntilSameAssignment =
    futureSameAssignmentWeeks.length > 0
      ? differenceInWeeks(parseISO(futureSameAssignmentWeeks[0]), selectedWeekDate)
      : null;

  const weeksUntilAnyAssignment =
    uniqueAllFutureWeeks.length > 0
      ? differenceInWeeks(parseISO(uniqueAllFutureWeeks[0]), selectedWeekDate)
      : null;

  return {
    weeksSinceSameAssignment,
    weeksSinceAnyAssignment,
    weeksUntilSameAssignment,
    weeksUntilAnyAssignment,
    avgWeeksBetweenSameAssignment,
    avgWeeksBetweenAnyAssignment,
    pastAssignments,
    currentWeekAssignments,
    futureAssignments,
  };
};

function calculateAverageGap(sortedWeeksDesc: string[]): number | null {
  if (sortedWeeksDesc.length < 2) return null;

  let totalGap = 0;
  for (let i = 0; i < sortedWeeksDesc.length - 1; i++) {
    const gap = differenceInWeeks(
      parseISO(sortedWeeksDesc[i]),
      parseISO(sortedWeeksDesc[i + 1]),
    );
    totalGap += gap;
  }

  return Math.round(totalGap / (sortedWeeksDesc.length - 1));
}
