import { Text } from "@ionic-display/text/Text";
import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { useTalkPresentationStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/useTalkPresentationStore";
import { formatMinutesSeconds } from "../../../../../../helper/formatMinutesSeconds";

export function SubsectionTiming() {
  const subsectionTime = useTalkPresentationStore((s) => s.subsectionTime);
  const subsectionTimes = useTalkPresentationStore((s) => s.subsectionTimes);
  const currentSubsectionIndex = useTalkPresentationStore(
    (s) => s.currentSubsectionIndex
  );
  const presentationTime = useTalkPresentationStore((s) => s.presentationTime);
  const remainingSubsectionTime = useTalkPresentationStore(
    (s) => s.remainingSubsectionTime
  );

  const timeAdjustment =
    subsectionTimes[currentSubsectionIndex] - subsectionTime;

  const adjustmentColor = timeAdjustment < 0 ? "success" : "danger";

  const remainingSubsectionsTime = subsectionTimes
    .slice(currentSubsectionIndex)
    .reduce((a, b) => a + b, 0);

  const timeDifference =
    remainingSubsectionsTime -
    presentationTime -
    (remainingSubsectionTime < 0 ? remainingSubsectionTime : 0);

  const differenceColor = timeDifference < 0 ? "success" : "danger";

  return (
    <Item>
      <IonLabel className="ion-text-center">
        <Text bold size="xl" color={adjustmentColor}>
          {formatMinutesSeconds(timeAdjustment)}
        </Text>
        {(currentSubsectionIndex + 1 !== subsectionTimes.length &&
          currentSubsectionIndex !== 0) && (
          <>
            <Text bold size="xl"> | </Text>
            <Text bold size="xl" color={differenceColor}>
              {formatMinutesSeconds(timeDifference)}
            </Text>
          </>
        )}
      </IonLabel>
    </Item>
  );
}
