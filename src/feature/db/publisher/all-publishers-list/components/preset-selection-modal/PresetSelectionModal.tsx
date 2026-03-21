import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { ItemOptionEdit } from "@input/sliding-item-option/ItemOptionEdit";
import { ItemOptionCopy } from "@input/sliding-item-option/ItemOptionCopy";
import { RenamePresetAlert } from "../rename-preset-alert/RenamePresetAlert";
import { DeletePresetAlert } from "../delete-preset-alert/DeletePresetAlert";
import { builtInPresets } from "../../publisherFilterState";
import {
  useFeatureAccess,
  TEMP_ALL_AUTHORIZED_USER_IDS,
} from "@services/app/auth/temp-feature-access/useFeatureAccess";
import type {
  PublisherFilterState,
  UserFilterPreset,
} from "../../publisherFilterState";

interface PresetSelectionModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  userPresets: UserFilterPreset[];
  onSelect: (filters: PublisherFilterState, name: string) => void;
  onRename: (id: string, newName: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PresetSelectionModal({
  isOpen,
  onDismiss,
  userPresets,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
}: PresetSelectionModalProps) {
  const [renameTarget, setRenameTarget] = useState<UserFilterPreset | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<UserFilterPreset | null>(
    null,
  );

  const handleSelect = (filters: PublisherFilterState, name: string) => {
    onSelect(filters, name);
    onDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter Presets</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BuiltInPresetsList onSelect={handleSelect} />
        {userPresets.length > 0 && (
          <UserPresetsList
            presets={userPresets}
            onSelect={handleSelect}
            onRename={setRenameTarget}
            onDuplicate={onDuplicate}
            onDelete={setDeleteTarget}
          />
        )}
        <RenamePresetAlert
          isOpen={renameTarget !== null}
          onDismiss={() => setRenameTarget(null)}
          preset={renameTarget}
          onRename={onRename}
        />
        <DeletePresetAlert
          isOpen={deleteTarget !== null}
          onDismiss={() => setDeleteTarget(null)}
          preset={deleteTarget}
          onDelete={onDelete}
        />
      </IonContent>
    </IonModal>
  );
}

function BuiltInPresetsList({
  onSelect,
}: {
  onSelect: (filters: PublisherFilterState, name: string) => void;
}) {
  const { isUnlocked } = useFeatureAccess(TEMP_ALL_AUTHORIZED_USER_IDS);
  
  const presets = isUnlocked
    ? builtInPresets
    : builtInPresets.filter(
        (p) =>
          p.id === "regular_pioneers" ||
          p.id === "ministerial_servants" ||
          p.id === "elders",
      );

  return (
    <List>
      <IonListHeader>
        <IonLabel>Lists</IonLabel>
      </IonListHeader>
      {presets.map((preset) => (
        <Item
          key={preset.id}
          button
          onClick={() => onSelect(preset.filters, preset.name)}
        >
          <IonLabel>
            <Text>{preset.name}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
}

function UserPresetsList({
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
  return (
    <List>
      <IonListHeader>
        <IonLabel>My Presets</IonLabel>
      </IonListHeader>
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
