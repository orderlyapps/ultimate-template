import {
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { TalkPresentationCountdownProgressBar } from "./components/talk-presentation-countdown-progress-bar/TalkPresentationCountdownProgressBar";
import { TalkPresentationCountdownTimeText } from "./components/talk-presentation-countdown-time-text/TalkPresentationCountdownTimeText";
import type { TalkPresentationCountdown } from "../../hooks/useTalkPresentationCountdown";

type Props = {
  talk: Outline;
  countdown: TalkPresentationCountdown | null;
  onClose: () => void;
};

export function TalkPresentationModalHeader({
  talk,
  countdown,
  onClose,
}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          {countdown ? (
            <TalkPresentationCountdownTimeText
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
        <TalkPresentationCountdownProgressBar value={countdown.progress} />
      ) : null}
    </IonHeader>
  );
}
