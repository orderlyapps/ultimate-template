import { IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { TimeText } from "./components/time-text/TimeText";
import type { TalkPresentationCountdown } from "../../hooks/useTalkPresentationCountdown";
import { SizeButtons } from "@input/size/size-buttons/SizeButtons";

type Props = {
  talk: Outline;
  countdown: TalkPresentationCountdown | null;
  onClose: () => void;
};

export function PresentationModalHeader({ talk, countdown, onClose }: Props) {
  const presentationTextSize = useTalksStore((state) => state.presentationTextSize);
  const setPresentationTextSize = useTalksStore((state) => state.setPresentationTextSize);

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
