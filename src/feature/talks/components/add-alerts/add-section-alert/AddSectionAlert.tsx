import { IonAlert } from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddSectionAlert({ isOpen, onDismiss }: Props) {
  const addSection = useTalksStore((s) => s.addSection);

  const { talkId } = useParams<{ talkId: string }>();

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
