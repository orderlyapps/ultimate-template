import { IonButtons, IonFooter, IonTitle, IonToolbar } from "@ionic/react";
import { Button } from "@ionic-input/button/Button";
import { Text } from "@ionic-display/text/Text";
import { formatMinutesSeconds } from "../../helper/formatMinutesSeconds";
import { useTalkPresentationStore } from "../../hooks/use-talk-presentation-store/useTalkPresentationStore";

export function PresentationModalFooter() {
  const remainingSubsectionTime = useTalkPresentationStore(
    (s) => s.remainingSubsectionTime
  );
  const currentSubsectionIndex = useTalkPresentationStore(
    (s) => s.currentSubsectionIndex
  );
  const subsectionTimes = useTalkPresentationStore((s) => s.subsectionTimes);
  const prevSubsection = useTalkPresentationStore((s) => s.prevSubsection);
  const nextSubsection = useTalkPresentationStore((s) => s.nextSubsection);

  const subsectionTime = useTalkPresentationStore((s) => s.subsectionTime);

  if (subsectionTime === 0) {
    return null;
  }

  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <Button
            expand="block"
            disabled={currentSubsectionIndex === 0}
            onClick={prevSubsection}
          >
            Back
          </Button>
        </IonButtons>

        <IonTitle>
          <Text
            bold
            size="xl"
            color={remainingSubsectionTime <= 0 ? "danger" : ""}
          >
            {formatMinutesSeconds(remainingSubsectionTime)}
          </Text>
        </IonTitle>

        <IonButtons slot="end">
          <Button
            expand="block"
            disabled={currentSubsectionIndex === subsectionTimes.length - 1}
            onClick={nextSubsection}
          >
            Next
          </Button>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
}
