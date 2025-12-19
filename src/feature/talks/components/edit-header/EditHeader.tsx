import { IonAlert, IonTitle } from "@ionic/react";
import { useState } from "react";

type Props = {
  value: string;
  header: string;
  placeholder: string;
  disabled?: boolean;
  onSave: (nextValue: string) => void;
};

export function EditableCondensedHeader({
  value,
  header,
  placeholder,
  disabled,
  onSave,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  return (
    <>
      <IonTitle
        onClick={() => {
          if (disabled) return;
          setAlertKey((k) => k + 1);
          setIsOpen(true);
        }}
        style={disabled ? undefined : { cursor: "pointer" }}
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
