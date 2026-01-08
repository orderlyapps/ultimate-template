import { Item } from "@ionic-layout/item/Item";
import {
  IonDatetime,
  IonDatetimeButton,
  IonLabel,
  IonModal,
} from "@ionic/react";
import { useId } from "react";
import { useTalkPresentationStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/useTalkPresentationStore";

export function PresentationTimePicker() {
  const datetimeId = useId();

  const presentationEndTime = useTalkPresentationStore(
    (s) => s.presentationEndTime
  );
  const setPresentationEndTime = useTalkPresentationStore(
    (s) => s.setPresentationEndTime
  );

  if (!presentationEndTime) {
    return null;
  }
  console.log(presentationEndTime);

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
          hourCycle="h12"
          value={presentationEndTime}
          onIonChange={(e) => {
            const next = e.detail.value;
            const nextValue = Array.isArray(next) ? next[0] : next;
            if (typeof nextValue !== "string") return;
            setPresentationEndTime(nextValue);
          }}
          showDefaultButtons={true}
        />
      </IonModal>
    </>
  );
}
