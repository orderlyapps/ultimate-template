import { IonAlert } from "@ionic/react";
import { useTalksStore } from "@feature/state/useTalksStore";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddTalkAlert({ isOpen, onDismiss }: Props) {
  const addTalk = useTalksStore((s) => s.addTalk);

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Add Talk"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Talk name",
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
            const name =
              typeof data?.name === "string" ? data.name.trim() : "";

            if (!name) return false;

            addTalk(name);
          },
        },
      ]}
    />
  );
}
