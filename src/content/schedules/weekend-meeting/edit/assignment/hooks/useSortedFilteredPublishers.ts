import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { formatPublisherName } from "@format/formatPublisherName";
import { usePublisherSortFilterStore } from "../store/usePublisherSortFilterStore";
import type { PublisherStatsMap, PublisherAssignmentStats } from "./usePublisherAssignmentStats";
import { DEFAULT_CONFIG, type SortableStatKey } from "../store/publisher-sort-filter.types";

export const useSortedFilteredPublishers = (
  publishers: Publisher[],
  statsMap: PublisherStatsMap,
  participantIds: Set<string>,
) => {
  const configByAssignment = usePublisherSortFilterStore((s) => s.configByAssignment);
  const currentAssignmentId = usePublisherSortFilterStore((s) => s.currentAssignmentId);
  const activeConfig = currentAssignmentId
    ? configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG
    : DEFAULT_CONFIG;

  const filtered = publishers.filter((publisher) => {
    const stats = statsMap.get(publisher.id);

    if (activeConfig.hideWithCurrentWeekAssignment && stats?.hasCurrentWeekAssignment) {
      return false;
    }

    if (activeConfig.hideNonParticipants && !participantIds.has(publisher.id)) {
      return false;
    }

    if (activeConfig.sortBy !== "alphabetical" && activeConfig.nullValueHandling === "hide") {
      const sortValue = stats ? getStatValue(stats, activeConfig.sortBy) : null;
      if (sortValue === null) return false;
    }

    if (!stats) return true;

    return activeConfig.filters.every((filter) => {
      const value = getStatValue(stats, filter.stat);
      if (value === null) return true;
      return value >= filter.minWeeks;
    });
  });

  const sorted = [...filtered].sort((a, b) => {
    const statsA = statsMap.get(a.id);
    const statsB = statsMap.get(b.id);

    if (activeConfig.sortBy === "alphabetical") {
      const nameA = formatPublisherName(a);
      const nameB = formatPublisherName(b);
      const comparison = nameA.localeCompare(nameB);
      return activeConfig.sortDirection === "asc" ? comparison : -comparison;
    }

    const valueA = statsA ? getStatValue(statsA, activeConfig.sortBy) : null;
    const valueB = statsB ? getStatValue(statsB, activeConfig.sortBy) : null;

    if (valueA === null && valueB === null) return 0;
    if (valueA === null) {
      return activeConfig.nullValueHandling === "start" ? -1 : 1;
    }
    if (valueB === null) {
      return activeConfig.nullValueHandling === "start" ? 1 : -1;
    }

    const comparison = valueA - valueB;
    return activeConfig.sortDirection === "asc" ? comparison : -comparison;
  });

  return sorted;
};

function getStatValue(
  stats: PublisherAssignmentStats,
  key: Exclude<SortableStatKey, "alphabetical">,
): number | null {
  return stats[key];
}
