import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { useState } from "react";
import { TalkPresentationTimePicker } from "./talk-presentation-time-picker/TalkPresentationTimePicker";

interface TalkPresentationModalProps {
  isOpen: boolean;
  talk: Outline;
  onDismiss: () => void;
}

function getTotalAllocatedSeconds(talk: Outline) {
  return talk.sections.reduce((talkTotal, section) => {
    const sectionTotal = section.subsections.reduce(
      (subTotal, subsection) => subTotal + (subsection.timeAllocation ?? 0),
      0
    );
    return talkTotal + sectionTotal;
  }, 0);
}

function toLocalDatetimeValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const TalkPresentationModal: React.FC<TalkPresentationModalProps> = ({
  isOpen,
  talk,
  onDismiss,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    return toLocalDatetimeValue(new Date());
  });

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      onWillPresent={() => {
        const totalSeconds = getTotalAllocatedSeconds(talk);
        const nextDate = new Date();
        nextDate.setSeconds(nextDate.getSeconds() + totalSeconds);
        setSelectedTime(toLocalDatetimeValue(nextDate));
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{talk.name}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TalkPresentationTimePicker
          value={selectedTime}
          onChange={(nextValue) => setSelectedTime(nextValue)}
        />
      </IonContent>
    </IonModal>
  );
};
