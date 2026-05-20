import { and, eq, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { cleanMajorCollection } from "@tanstack-db/clean_major/cleanMajorCollection";
import { cleanMinorCollection } from "@tanstack-db/clean_minor/cleanMinorCollection";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import type { Group } from "@tanstack-db/group/groupSchema";

/**
 * Data for a single week in the cleaning schedule
 */
export type WeekCleaningScheduleData = {
  weekId: string;
  majorGroup: Group | undefined;
  minorGroup: Group | undefined;
};

/**
 * Hook to fetch all cleaning assignments for a date range.
 * Returns the cleaning assignments for each week in the range, combined with group data.
 *
 * @param dateRange - Object containing firstMonday and lastMonday ISO date strings
 * @returns Object with weeks array (sorted by week_id) and isLoading flag
 */
export function useCleaningScheduleData(dateRange: {
  firstMonday: string;
  lastMonday: string;
}): {
  weeks: WeekCleaningScheduleData[];
  isLoading: boolean;
} {
  const [userCongregation] = useUserCongregation();

  // Fetch major cleaning assignments for weeks in the selected month range
  const { data: cleanMajorAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ cm: cleanMajorCollection })
        .where(({ cm }) =>
          and(
            gte(cm.week_id, dateRange.firstMonday),
            lte(cm.week_id, dateRange.lastMonday),
            eq(cm.congregation_id, userCongregation?.id ?? ""),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday, userCongregation?.id],
  );

  // Fetch minor cleaning assignments for weeks in the selected month range
  const { data: cleanMinorAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ cmn: cleanMinorCollection })
        .where(({ cmn }) =>
          and(
            gte(cmn.week_id, dateRange.firstMonday),
            lte(cmn.week_id, dateRange.lastMonday),
            eq(cmn.congregation_id, userCongregation?.id ?? ""),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday, userCongregation?.id],
  );

  // Fetch all groups to resolve group names
  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }),
  );

  // Build a lookup map for groups by ID
  const groupMap = new Map<string, Group>();
  for (const group of groups ?? []) {
    groupMap.set(group.id, group);
  }

  // Build lookup maps for assignments by week_id
  const majorByWeek = new Map<string, string>();
  for (const assignment of cleanMajorAssignments ?? []) {
    majorByWeek.set(assignment.week_id, assignment.group_id);
  }

  const minorByWeek = new Map<string, string>();
  for (const assignment of cleanMinorAssignments ?? []) {
    minorByWeek.set(assignment.week_id, assignment.group_id);
  }

  // Build the weeks array with assignments
  const weeks: WeekCleaningScheduleData[] = [];

  // Generate all weeks in the date range
  const startDate = new Date(dateRange.firstMonday);
  const endDate = new Date(dateRange.lastMonday);

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 7)
  ) {
    const weekId = current.toISOString().split("T")[0];
    const majorGroupId = majorByWeek.get(weekId);
    const minorGroupId = minorByWeek.get(weekId);

    weeks.push({
      weekId,
      majorGroup: majorGroupId ? groupMap.get(majorGroupId) : undefined,
      minorGroup: minorGroupId ? groupMap.get(minorGroupId) : undefined,
    });
  }

  const isLoading =
    cleanMajorAssignments === undefined ||
    cleanMinorAssignments === undefined ||
    groups === undefined;

  return {
    weeks,
    isLoading,
  };
}
