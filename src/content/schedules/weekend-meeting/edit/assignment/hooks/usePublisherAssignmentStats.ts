import { eq, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { differenceInWeeks, parseISO } from "date-fns";
import type { WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

export type PublisherAssignmentStats = {
  weeksSinceSameAssignment: number | null;
  weeksSinceAnyAssignment: number | null;
  weeksUntilSameAssignment: number | null;
  weeksUntilAnyAssignment: number | null;
  avgWeeksBetweenSameAssignment: number | null;
  avgWeeksBetweenAnyAssignment: number | null;
  hasCurrentWeekAssignment: boolean;
};

export type PublisherStatsMap = Map<string, PublisherAssignmentStats>;

export const usePublisherAssignmentStats = (
  weekId: string,
  assignmentId: WeekendAssignmentID | null,
) => {
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

  const statsMap: PublisherStatsMap = new Map();

  if (!weekId || !assignmentId) return { statsMap };

  const selectedWeekDate = parseISO(weekId);

  const publisherIds = new Set<string>();
  weekendAssignments?.forEach((wa) => publisherIds.add(wa.participant_id));
  speakerAssignments?.forEach((sa) => publisherIds.add(sa.speaker_id));

  for (const publisherId of publisherIds) {
    const sameAssignmentWeeks = weekendAssignments
      ?.filter(
        (wa) =>
          wa.participant_id === publisherId &&
          wa.assignment_id === assignmentId &&
          wa.week_id < weekId,
      )
      .map((wa) => wa.week_id)
      .sort()
      .reverse() ?? [];

    const allAssignmentWeeks = [
      ...(weekendAssignments
        ?.filter((wa) => wa.participant_id === publisherId && wa.week_id < weekId)
        .map((wa) => wa.week_id) ?? []),
      ...(speakerAssignments
        ?.filter((sa) => sa.speaker_id === publisherId && sa.week_id < weekId)
        .map((sa) => sa.week_id) ?? []),
    ]
      .sort()
      .reverse();

    const uniqueAllWeeks = [...new Set(allAssignmentWeeks)];

    const currentWeekAssignments = [
      ...(weekendAssignments?.filter(
        (wa) => wa.participant_id === publisherId && wa.week_id === weekId,
      ) ?? []),
      ...(speakerAssignments?.filter(
        (sa) => sa.speaker_id === publisherId && sa.week_id === weekId,
      ) ?? []),
    ];

    const weeksSinceSameAssignment =
      sameAssignmentWeeks.length > 0
        ? differenceInWeeks(selectedWeekDate, parseISO(sameAssignmentWeeks[0]))
        : null;

    const weeksSinceAnyAssignment =
      uniqueAllWeeks.length > 0
        ? differenceInWeeks(selectedWeekDate, parseISO(uniqueAllWeeks[0]))
        : null;

    const futureSameAssignmentWeeks = weekendAssignments
      ?.filter(
        (wa) =>
          wa.participant_id === publisherId &&
          wa.assignment_id === assignmentId &&
          wa.week_id > weekId,
      )
      .map((wa) => wa.week_id)
      .sort() ?? [];

    const allFutureWeeks = [
      ...(weekendAssignments
        ?.filter((wa) => wa.participant_id === publisherId && wa.week_id > weekId)
        .map((wa) => wa.week_id) ?? []),
      ...(speakerAssignments
        ?.filter((sa) => sa.speaker_id === publisherId && sa.week_id > weekId)
        .map((sa) => sa.week_id) ?? []),
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

    const avgWeeksBetweenSameAssignment = calculateAverageGap(sameAssignmentWeeks);
    const avgWeeksBetweenAnyAssignment = calculateAverageGap(uniqueAllWeeks);

    statsMap.set(publisherId, {
      weeksSinceSameAssignment,
      weeksSinceAnyAssignment,
      weeksUntilSameAssignment,
      weeksUntilAnyAssignment,
      avgWeeksBetweenSameAssignment,
      avgWeeksBetweenAnyAssignment,
      hasCurrentWeekAssignment: currentWeekAssignments.length > 0,
    });
  }

  return { statsMap };
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
