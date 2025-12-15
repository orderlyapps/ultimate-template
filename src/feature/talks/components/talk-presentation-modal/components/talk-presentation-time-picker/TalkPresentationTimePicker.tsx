import {
  IonDatetime,
  IonDatetimeButton,
  IonItem,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { useId } from "react";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
};

export function TalkPresentationTimePicker({ value, onChange }: Props) {
  const datetimeId = useId();

  return (
    <>
      <IonItem>
        <IonLabel>End Time</IonLabel>
        <IonDatetimeButton datetime={datetimeId} />
      </IonItem>

      <IonModal keepContentsMounted>
        <IonDatetime
          id={datetimeId}
          presentation="time"
          value={value}
          onIonChange={(e) => {
            const next = e.detail.value;
            const nextValue = Array.isArray(next) ? next[0] : next;
            if (typeof nextValue !== "string") return;
            onChange(nextValue);
          }}
          showDefaultButtons={true}
        />
      </IonModal>
    </>
  );
}
