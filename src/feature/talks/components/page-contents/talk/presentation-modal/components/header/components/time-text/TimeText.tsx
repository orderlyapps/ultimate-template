import { Text } from "@ionic-display/text/Text";
import { useCurrentTalkPresentationCountdown } from "../../../../hooks/use-current-talk-presentation-countdown/useCurrentTalkPresentationCountdown";
import { IonTitle } from "@ionic/react";

function formatMinutesSeconds(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

type Props = {
  remainingSeconds?: number;
};

export function TimeText({ remainingSeconds }: Props = {}) {
  const { countdown } = useCurrentTalkPresentationCountdown();

  const seconds = remainingSeconds ?? countdown?.remainingSeconds;

  if (seconds === undefined || seconds === null) {
    return null;
  }

  return (
    <IonTitle>
      <Text bold size="xl">
        {formatMinutesSeconds(seconds)}
      </Text>
    </IonTitle>
  );
}
