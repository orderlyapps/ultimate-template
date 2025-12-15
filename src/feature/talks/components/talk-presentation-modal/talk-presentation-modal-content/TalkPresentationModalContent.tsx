import { IonButton } from "@ionic/react";
import { TalkPresentationCountdown } from "../talk-presentation-countdown/TalkPresentationCountdown";
import { TalkPresentationTimePicker } from "../talk-presentation-time-picker/TalkPresentationTimePicker";

type Props = {
  isRunning: boolean;
  startMs: number | null;
  endMs: number | null;
  selectedTime: string;
  onSelectedTimeChange: (nextValue: string) => void;
  onStart: () => void;
  onFinished: () => void;
};

export function TalkPresentationModalContent({
  isRunning,
  startMs,
  endMs,
  selectedTime,
  onSelectedTimeChange,
  onStart,
  onFinished,
}: Props) {
  if (isRunning && startMs !== null && endMs !== null) {
    return (
      <TalkPresentationCountdown
        startMs={startMs}
        endMs={endMs}
        isActive={true}
        onFinished={onFinished}
      />
    );
  }

  return (
    <>
      <TalkPresentationTimePicker
        value={selectedTime}
        onChange={(nextValue) => onSelectedTimeChange(nextValue)}
      />
      <IonButton expand="block" onClick={onStart}>
        Start
      </IonButton>
    </>
  );
}
