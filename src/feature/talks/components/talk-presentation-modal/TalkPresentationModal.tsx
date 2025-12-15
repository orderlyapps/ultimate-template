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
import { useRef, useState } from "react";
import {
  getTotalAllocatedSeconds,
  toLocalDatetimeValue,
} from "./talk-presentation-modal-utils";
import { TalkPresentationModalContent } from "./talk-presentation-modal-content/TalkPresentationModalContent";

interface TalkPresentationModalProps {
  isOpen: boolean;
  talk: Outline;
  onDismiss: () => void;
}

export const TalkPresentationModal: React.FC<TalkPresentationModalProps> = ({
  isOpen,
  talk,
  onDismiss,
}) => {
  const modalRef = useRef<HTMLIonModalElement | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    return toLocalDatetimeValue(new Date());
  });
  const [startMs, setStartMs] = useState<number | null>(null);
  const [endMs, setEndMs] = useState<number | null>(null);

  const isRunning = startMs !== null && endMs !== null;

  const handleStart = () => {
    const nextEndMs = new Date(selectedTime).getTime();
    if (!Number.isFinite(nextEndMs)) return;
    const nextStartMs = Date.now();
    if (nextEndMs <= nextStartMs) return;

    setStartMs(nextStartMs);
    setEndMs(nextEndMs);
  };

  return (
    <IonModal
      ref={modalRef}
      isOpen={isOpen}
      onDidDismiss={() => {
        setStartMs(null);
        setEndMs(null);
        onDismiss();
      }}
      onWillPresent={() => {
        const totalSeconds = getTotalAllocatedSeconds(talk);
        const nextDate = new Date();
        nextDate.setSeconds(nextDate.getSeconds() + totalSeconds);
        setSelectedTime(toLocalDatetimeValue(nextDate));
        setStartMs(null);
        setEndMs(null);
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{talk.name}</IonTitle>
          <IonButtons slot="end">
            <CloseButton
              onClick={() => {
                modalRef.current?.dismiss();
              }}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TalkPresentationModalContent
          isRunning={isRunning}
          startMs={startMs}
          endMs={endMs}
          selectedTime={selectedTime}
          onSelectedTimeChange={(nextValue) => setSelectedTime(nextValue)}
          onStart={handleStart}
          onFinished={() => {
            setStartMs(null);
            setEndMs(null);
          }}
        />
      </IonContent>
    </IonModal>
  );
};
