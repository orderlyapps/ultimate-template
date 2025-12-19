import { Item } from "@ionic-layout/item/Item";
import {
  IonDatetime,
  IonDatetimeButton,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { useId } from "react";
import { PresentationTimePickerHelp } from "./components/PresentationTimePickerHelp";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
};

export function PresentationTimePicker({ value, onChange }: Props) {
  const datetimeId = useId();

  return (
    <>
      <PresentationTimePickerHelp />
      <Item>
        <IonLabel>End Time</IonLabel>
        <IonDatetimeButton datetime={datetimeId} />
      </Item>

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
