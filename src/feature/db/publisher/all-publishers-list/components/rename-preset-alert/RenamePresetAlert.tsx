import { IonAlert } from "@ionic/react";
import type { UserFilterPreset } from "../../publisherFilterState";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  preset: UserFilterPreset | null;
  onRename: (id: string, newName: string) => void;
};

export function RenamePresetAlert({ isOpen, onDismiss, preset, onRename }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Rename Preset"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Preset name",
          value: preset?.name ?? "",
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Save",
          handler: (data) => {
            const name =
              typeof data?.name === "string" ? data.name.trim() : "";
            if (!name || !preset) return false;
            onRename(preset.id, name);
          },
        },
      ]}
    />
  );
}
