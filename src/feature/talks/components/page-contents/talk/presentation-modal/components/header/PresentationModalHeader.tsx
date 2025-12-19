import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { TimeText } from "./components/time-text/TimeText";
import type { TalkPresentationCountdown } from "../../hooks/useTalkPresentationCountdown";

type Props = {
  talk: Outline;
  countdown: TalkPresentationCountdown | null;
  onClose: () => void;
};

export function PresentationModalHeader({
  talk,
  countdown,
  onClose,
}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          {countdown ? (
            <TimeText
              remainingSeconds={countdown.remainingSeconds}
            />
          ) : (
            talk.name
          )}
        </IonTitle>
        <IonButtons slot="end">
          <CloseButton onClick={onClose} />
        </IonButtons>
      </IonToolbar>
      {countdown ? (
        <ProgressBar value={countdown.progress} />
      ) : null}
    </IonHeader>
  );
}
