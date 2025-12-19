import { IonAlert } from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

type Props = {
  talkId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddSectionAlert({ talkId, isOpen, onDismiss }: Props) {
  const addSection = useTalksStore((s) => s.addSection);

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Add Section"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Section name",
        },
      ]}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: (data) => {
            const name = typeof data?.name === "string" ? data.name.trim() : "";

            if (!name) return false;

            addSection(talkId, name);
          },
        },
      ]}
    />
  );
}
