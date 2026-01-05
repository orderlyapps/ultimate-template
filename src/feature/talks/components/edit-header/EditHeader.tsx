import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { IonAlert, IonTitle } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function EditableCondensedHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  const updateTalkName = useTalksStore((s) => s.updateTalkName);

  return (
    <>
      <IonTitle
        onClick={() => {
          if (!talkId) return;
          setAlertKey((k) => k + 1);
          setIsOpen(true);
        }}
        style={!talkId ? undefined : { cursor: "pointer" }}
      >
        {talk?.name}
      </IonTitle>

      <IonAlert
        key={alertKey}
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        header={"Rename Talk"}
        inputs={[
          {
            name: "value",
            type: "text",
            placeholder: "Talk name",
            value: talk?.name,
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
              const nextValue =
                typeof data?.value === "string" ? data.value.trim() : "";

              if (!nextValue) return false;

              updateTalkName(talkId, nextValue);
            },
          },
        ]}
      />
    </>
  );
}
