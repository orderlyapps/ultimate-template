import { IonLabel } from "@ionic/react";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  type NullValueHandling,
} from "../../../../../../store/publisher-sort-filter.types";
import { SelectItem } from "@input/select/SelectItem";

const NULL_HANDLING_OPTIONS: { value: NullValueHandling; label: string }[] = [
  { value: "end", label: "Show at End" },
  { value: "start", label: "Show at Start" },
  { value: "hide", label: "Hide" },
];

export const NullHandlingSelect: React.FC = () => {
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

  const handleChange = (value: NullValueHandling) => {
    setActiveConfig({ ...activeConfig, nullValueHandling: value });
  };

  if (activeConfig.sortBy === "alphabetical") return null;

  return (
    <SelectItem
      label="Zero Value Stats"
      options={NULL_HANDLING_OPTIONS}
      onIonChange={(e) => handleChange(e.detail.value)}
      value={activeConfig.nullValueHandling}
    >
      <IonLabel slot="label">Zero Values</IonLabel>
    </SelectItem>
  );
};
