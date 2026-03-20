import { IonAlert } from "@ionic/react";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  onSave: (name: string) => void;
};

export function SavePresetAlert({ isOpen, onDismiss, onSave }: Props) {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Save as Preset"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Preset name",
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
            if (!name) return false;
            onSave(name);
          },
        },
      ]}
    />
  );
}
