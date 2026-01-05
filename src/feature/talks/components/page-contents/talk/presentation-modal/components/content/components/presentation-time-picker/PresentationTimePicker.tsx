import { Item } from "@ionic-layout/item/Item";
import {
  IonDatetime,
  IonDatetimeButton,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { useId } from "react";
import { useCurrentTalkPresentationCountdown } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-current-talk-presentation-countdown/useCurrentTalkPresentationCountdown";

export function PresentationTimePicker() {
  const datetimeId = useId();
  const { selectedTime, setSelectedTime } =
    useCurrentTalkPresentationCountdown();

  return (
    <>
      <Item>
        <IonLabel>End Time</IonLabel>
        <IonDatetimeButton datetime={datetimeId} />
      </Item>

      <IonModal keepContentsMounted>
        <IonDatetime
          id={datetimeId}
          presentation="time"
          value={selectedTime}
          onIonChange={(e) => {
            const next = e.detail.value;
            const nextValue = Array.isArray(next) ? next[0] : next;
            if (typeof nextValue !== "string") return;
            setSelectedTime(nextValue);
          }}
          showDefaultButtons={true}
        />
      </IonModal>
    </>
  );
}
