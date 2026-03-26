import { Item } from "@ionic-layout/item/Item";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  STAT_LABELS,
  type SortableStatKey,
} from "../../../../../../store/publisher-sort-filter.types";
import { Text } from "@ionic-display/text/Text";

const SORT_OPTIONS: SortableStatKey[] = [
  "alphabetical",
  "weeksSinceSameAssignment",
  "weeksSinceAnyAssignment",
  "weeksUntilSameAssignment",
  "weeksUntilAnyAssignment",
  "avgWeeksBetweenSameAssignment",
  "avgWeeksBetweenAnyAssignment",
];

export const SortBySelect: React.FC = () => {
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);

  const activeConfig = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG)
    : DEFAULT_CONFIG;

  const handleChange = (value: SortableStatKey) => {
    setActiveConfig({ ...activeConfig, sortBy: value });
  };

  return (
    <>
      {SORT_OPTIONS.map((key) => (
        <Item key={key} onClick={() => handleChange(key)}>
          <Text bold={activeConfig.sortBy === key}>{STAT_LABELS[key]}</Text>
        </Item>
      ))}
    </>
  );
};
