import { IonItemSliding, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import type { SortFilterPreset } from "../../../../../../store/publisher-sort-filter.types";
import { PresetSlidingOptions } from "./components/preset-actions/PresetSlidingOptions";

type Props = {
  preset: SortFilterPreset;
};

export const PresetItem: React.FC<Props> = ({ preset }) => {
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const applyPreset = usePublisherSortFilterStore((s) => s.applyPreset);
  const activePresetId = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.presetId ?? null)
    : null;
  const isActive = activePresetId === preset.id;

  const handleClick = () => {
    applyPreset(preset);
  };

  if (preset.isBuiltIn) {
    return (
      <Item onClick={handleClick}>
        <IonLabel>
          <Text bold={isActive}>{preset.name}</Text>
        </IonLabel>
      </Item>
    );
  }

  return (
    <IonItemSliding>
      <Item onClick={handleClick}>
        <IonLabel>
          <Text bold={isActive}>{preset.name}</Text>
        </IonLabel>
      </Item>
      <PresetSlidingOptions preset={preset} />
    </IonItemSliding>
  );
};
