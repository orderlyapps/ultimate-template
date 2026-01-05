import { PresentationTimePicker } from "./components/presentation-time-picker/PresentationTimePicker";
import { useTalkPresentationModalStore } from "../../hooks/useTalkPresentationModalStore";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { PresentationViewer } from "./components/presentation-view/PresentationView";
import { IonList } from "@ionic/react";
import { PresentationModalContentHelp } from "./components/PresentationModalContentHelp";

export function PresentationModalContent() {
  const selectedTime = useTalkPresentationModalStore((s) => s.selectedTime);
  const setSelectedTime = useTalkPresentationModalStore(
    (s) => s.setSelectedTime
  );
  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const start = useTalkPresentationModalStore((s) => s.start);

  const isRunning = startMs !== null && endMs !== null;

  if (isRunning && startMs !== null && endMs !== null) {
    return <PresentationViewer />;
  }

  return (
    <IonList lines="none" inset>
      <PresentationModalContentHelp />
      <Space />
      <PresentationTimePicker
        value={selectedTime}
        onChange={(nextValue) => setSelectedTime(nextValue)}
      />
      <Space />
      <Button expand="block" onClick={start}>
        Start
      </Button>
    </IonList>
  );
}
