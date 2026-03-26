import type { PublisherAssignmentStats } from "../../../../hooks/usePublisherAssignmentStats";
import { usePublisherSortFilterStore } from "../../../../store/usePublisherSortFilterStore";
import {
  type SortableStatKey,
} from "../../../../store/publisher-sort-filter.types";
import { IonChip } from "@ionic/react";

type Props = {
  stats: PublisherAssignmentStats | undefined;
};

export const StatsDisplay: React.FC<Props> = ({ stats }) => {
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const sortBy = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.config?.sortBy ??
      "alphabetical")
    : "alphabetical";

  if (!stats) return null;
  if (sortBy === "alphabetical") return null;

  const value = getStatValue(stats, sortBy);

  return <IonChip>{`${value ?? "-"}`}</IonChip>;
};

function getStatValue(
  stats: PublisherAssignmentStats,
  key: Exclude<SortableStatKey, "alphabetical">,
): number | null {
  return stats[key];
}
