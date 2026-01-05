import { Text } from "@ionic-display/text/Text";
import { IonLabel } from "@ionic/react";
import { useTalkPresentationModalStore } from "../../../../../../hooks/use-talk-presentation-modal-store/useTalkPresentationModalStore";
import { Item } from "@ionic-layout/item/Item";

function formatDeltaMinutesSeconds(deltaMs: number) {
  const roundedSeconds = Math.round(deltaMs / 1000);
  const safeSeconds = Object.is(roundedSeconds, -0) ? 0 : roundedSeconds;
  const sign = safeSeconds > 0 ? "+" : safeSeconds < 0 ? "-" : "";
  const absSeconds = Math.abs(safeSeconds);
  const minutes = Math.floor(absSeconds / 60);
  const seconds = absSeconds % 60;
  return `${sign}${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function TimingAdjustment() {
  const subsectionTimingAdjustmentPercent = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentPercent
  );
  const subsectionTimingAdjustmentMs = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentMs
  );

  if (subsectionTimingAdjustmentPercent === null) {
    return null;
  }

  return (
    <Item>
      <IonLabel className="ion-text-center">
        <Text
          bold
          size="xl"
          color={
            subsectionTimingAdjustmentMs !== null &&
            subsectionTimingAdjustmentMs > 0
              ? "success"
              : "danger"
          }
        >
          {subsectionTimingAdjustmentMs !== null
            ? `${formatDeltaMinutesSeconds(subsectionTimingAdjustmentMs)}`
            : ""}
        </Text>
      </IonLabel>
    </Item>
  );
}
