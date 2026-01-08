import { PresentationModalContentHelp } from "./components/presentation-modal-content-help/PresentationModalContentHelp";
import { PresentationTimePicker } from "./components/presentation-time-picker/PresentationTimePicker";
import { PresentationView } from "./components/presentation-view/PresentationView";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { IonList } from "@ionic/react";
import { useTalkPresentationStore } from "../../hooks/use-talk-presentation-store/useTalkPresentationStore";

export function PresentationModalContent() {
  const isPresentationRunning = useTalkPresentationStore(
    (s) => s.isPresentationRunning
  );
  const startPresentation = useTalkPresentationStore(
    (s) => s.startPresentation
  );

  if (isPresentationRunning) {
    return <PresentationView />;
  }

  return (
    <IonList lines="none" inset>
      <PresentationModalContentHelp />

      <Space />

      <PresentationTimePicker />

      <Space />

      <Button expand="block" onClick={startPresentation}>
        Start
      </Button>
    </IonList>
  );
}
