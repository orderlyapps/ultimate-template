import {
  IonIcon,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { ItemOptionEdit } from "@input/sliding-item-option/ItemOptionEdit";
import { ItemOptionCopy } from "@input/sliding-item-option/ItemOptionCopy";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Space } from "@layout/space/Space";
import addIcon from "@icons/add.svg";
import { usePublisherListsStore } from "@/content/publishers/lists/store/usePublisherListsStore";
import type {
  PublisherFilterState,
  UserFilterPreset,
} from "../../publisherFilterState";

export function UserPresetsList({
  presets,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
}: {
  presets: UserFilterPreset[];
  onSelect: (filters: PublisherFilterState, name: string) => void;
  onRename: (preset: UserFilterPreset) => void;
  onDuplicate: (id: string) => void;
  onDelete: (preset: UserFilterPreset) => void;
}) {
  const { setIsFilterModalOpen } = usePublisherListsStore();

  return (
    <List>
      <Space height="2" />
      <Item>
        <IonLabel>
          <SectionHeading>User Presets</SectionHeading>
        </IonLabel>

        <IonIcon
          onClick={() => setIsFilterModalOpen(true)}
          src={addIcon}
          color="primary"
        />
      </Item>
      {presets.length === 0 ? (
        <Item
          lines="none"
          className="ion-text-center ion-margin-top ion-padding-top"
        >
          <IonLabel className="ion-text-center ion-margin-top">
            <Text color="medium">
              No presets yet. Press on the add button above.
            </Text>
          </IonLabel>
        </Item>
      ) : null}

      {presets.map((preset) => (
        <IonItemSliding key={preset.id}>
          <Item button onClick={() => onSelect(preset.filters, preset.name)}>
            <IonLabel>
              <Text>{preset.name}</Text>
            </IonLabel>
          </Item>
          <IonItemOptions side="end">
            <ItemOptionEdit onClick={() => onRename(preset)} />
            <ItemOptionCopy onClick={() => onDuplicate(preset.id)} />
            <ItemOptionDelete onClick={() => onDelete(preset)} />
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </List>
  );
}
