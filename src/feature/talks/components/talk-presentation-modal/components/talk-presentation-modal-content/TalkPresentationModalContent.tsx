import { IonButton } from "@ionic/react";
import { TalkPresentationTimePicker } from "../talk-presentation-time-picker/TalkPresentationTimePicker";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";

export function TalkPresentationModalContent() {
  const selectedTime = useTalkPresentationModalStore((s) => s.selectedTime);
  const setSelectedTime = useTalkPresentationModalStore(
    (s) => s.setSelectedTime
  );
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const start = useTalkPresentationModalStore((s) => s.start);

  const isRunning = startMs !== null && endMs !== null;

  if (isRunning && startMs !== null && endMs !== null) {
    return null;
  }

  return (
    <>
      <TalkPresentationTimePicker
        value={selectedTime}
        onChange={(nextValue) => setSelectedTime(nextValue)}
      />
      <IonButton expand="block" onClick={start}>
        Start
      </IonButton>
    </>
  );
}
