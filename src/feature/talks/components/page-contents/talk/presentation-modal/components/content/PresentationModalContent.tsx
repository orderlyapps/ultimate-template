import { PresentationTimePicker } from "./components/presentation-time-picker/PresentationTimePicker";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { PresentationViewer } from "./components/presentation-view/PresentationView";
import { IonList } from "@ionic/react";
import { PresentationModalContentHelp } from "./components/presentation-modal-content-help/PresentationModalContentHelp";
import { useCurrentTalkPresentationCountdown } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-current-talk-presentation-countdown/useCurrentTalkPresentationCountdown";

export function PresentationModalContent() {
  const { startMs, endMs, start } = useCurrentTalkPresentationCountdown();

  const isRunning = startMs !== null && endMs !== null;

  if (isRunning && startMs !== null && endMs !== null) {
    return <PresentationViewer />;
  }

  return (
    <IonList lines="none" inset>
      <PresentationModalContentHelp />

      <Space />

      <PresentationTimePicker />

      <Space />

      <Button expand="block" onClick={start}>
        Start
      </Button>
    </IonList>
  );
}
