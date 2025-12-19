import { IonAlert } from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

type Props = {
  talkId: string;
  sectionId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddSubsectionAlert({
  talkId,
  sectionId,
  isOpen,
  onDismiss,
}: Props) {
  const addSubsection = useTalksStore((s) => s.addSubsection);

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      header="Add Subsection"
      inputs={[
        {
          name: "name",
          type: "text",
          placeholder: "Subsection name",
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

            addSubsection(talkId, sectionId, name);
          },
        },
      ]}
    />
  );
}
