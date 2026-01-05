import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { TimeText } from "./components/time-text/TimeText";
import { useTalkPresentationCountdown } from "../../hooks/useTalkPresentationCountdown";
import { SizeButtons } from "@input/size/size-buttons/SizeButtons";
import { useTalkPresentationModalStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/useTalkPresentationModalStore";

type Props = {
  talk: Outline;
  onClose: () => void;
};

export function PresentationModalHeader({ talk, onClose }: Props) {
  const presentationTextSize = useTalksStore(
    (state) => state.presentationTextSize
  );
  const setPresentationTextSize = useTalksStore(
    (state) => state.setPresentationTextSize
  );

  const startMs = useTalkPresentationModalStore((s) => s.startMs);
  const endMs = useTalkPresentationModalStore((s) => s.endMs);
  const finish = useTalkPresentationModalStore((s) => s.finish);

  const countdown = useTalkPresentationCountdown({
    startMs,
    endMs,
    onFinished: finish,
  });

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <CloseButton onClick={onClose} />
        </IonButtons>
        <IonTitle>
          {countdown ? (
            <TimeText remainingSeconds={countdown.remainingSeconds} />
          ) : (
            talk.name
          )}
        </IonTitle>
        <IonButtons slot="end">
          <SizeButtons
            value={presentationTextSize}
            onSizeChange={setPresentationTextSize}
          />
        </IonButtons>
      </IonToolbar>
      {countdown ? <ProgressBar value={countdown.progress} /> : null}
    </IonHeader>
  );
}
