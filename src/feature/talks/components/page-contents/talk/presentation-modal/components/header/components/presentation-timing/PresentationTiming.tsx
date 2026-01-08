import { Text } from "@ionic-display/text/Text";
import { IonTitle } from "@ionic/react";
import { formatMinutesSeconds } from "../../../../helper/formatMinutesSeconds";
import { useTalkPresentationStore } from "../../../../hooks/use-talk-presentation-store/useTalkPresentationStore";

export function PresentationTiming() {
  const remainingPresentationTime = useTalkPresentationStore(
    (s) => s.remainingPresentationTime
  );

  if (remainingPresentationTime <= 0) {
    return null;
  }

  return (
    <IonTitle>
      <Text bold size="xl">
        {formatMinutesSeconds(remainingPresentationTime)}
      </Text>
    </IonTitle>
  );
}
