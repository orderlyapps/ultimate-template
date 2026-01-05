import { IonAlert, IonTitle } from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function EditableCondensedHeader({
  value,
  header,
  placeholder,
  onSave,
}: {
  value: string;
  header: string;
  placeholder: string;
  onSave: (nextValue: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const { talkId } = useParams<{ talkId: string }>();

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
        {value}
      </IonTitle>

      <IonAlert
        key={alertKey}
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        header={header}
        inputs={[
          {
            name: "value",
            type: "text",
            placeholder,
            value,
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
              onSave(nextValue);
            },
          },
        ]}
      />
    </>
  );
}
