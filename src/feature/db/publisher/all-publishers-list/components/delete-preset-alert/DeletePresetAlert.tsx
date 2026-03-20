import { IonAlert } from "@ionic/react";
import type { UserFilterPreset } from "../../publisherFilterState";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  preset: UserFilterPreset | null;
  onDelete: (id: string) => void;
};

export function DeletePresetAlert({ isOpen, onDismiss, preset, onDelete }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Delete Preset"
      message={`Are you sure you want to delete "${preset?.name}"?`}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            if (preset) onDelete(preset.id);
          },
        },
      ]}
    />
  );
}
