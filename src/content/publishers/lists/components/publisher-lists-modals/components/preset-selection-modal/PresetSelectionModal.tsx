import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { RenamePresetAlert } from "./rename-preset-alert/RenamePresetAlert";
import { DeletePresetAlert } from "./delete-preset-alert/DeletePresetAlert";
import { BuiltInPresetsList } from "./components/built-in-presets-list/BuiltInPresetsList";
import { UserPresetsList } from "./components/user-presets-list/UserPresetsList";
import type {
  PublisherFilterState,
  UserFilterPreset,
} from "./publisherFilterState";

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
        {
          <UserPresetsList
            presets={userPresets}
            onSelect={handleSelect}
            onRename={setRenameTarget}
            onDuplicate={onDuplicate}
            onDelete={setDeleteTarget}
          />
        }
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

