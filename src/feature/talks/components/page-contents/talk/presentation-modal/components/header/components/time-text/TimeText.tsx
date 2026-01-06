import { Text } from "@ionic-display/text/Text";
import { useCurrentTalkPresentationCountdown } from "../../../../hooks/use-current-talk-presentation-countdown/useCurrentTalkPresentationCountdown";
import { IonTitle } from "@ionic/react";
import { formatMinutesSeconds } from "./helper/formatMinutesSeconds";

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
