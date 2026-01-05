import { IonProgressBar } from "@ionic/react";
import { useCurrentTalkPresentationCountdown } from "../../../../hooks/use-current-talk-presentation-countdown/useCurrentTalkPresentationCountdown";

export function ProgressBar() {
  const { countdown } = useCurrentTalkPresentationCountdown();

  if (!countdown) {
    return null;
  }

  return <IonProgressBar value={countdown.progress} />;
}
