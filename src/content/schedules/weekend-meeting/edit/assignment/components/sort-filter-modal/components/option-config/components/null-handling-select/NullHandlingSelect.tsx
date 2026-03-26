import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  type NullValueHandling,
} from "../../../../../../store/publisher-sort-filter.types";
import { IonLabel, IonSelectOption } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Select } from "@ionic-input/select/Select";

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
    <Item>
      <Select
        onIonChange={(e) => handleChange(e.detail.value)}
        value={activeConfig.nullValueHandling}
      >
        <IonLabel slot="label">Display when stat is zero</IonLabel>

        {NULL_HANDLING_OPTIONS.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </Select>
    </Item>
  );
};
