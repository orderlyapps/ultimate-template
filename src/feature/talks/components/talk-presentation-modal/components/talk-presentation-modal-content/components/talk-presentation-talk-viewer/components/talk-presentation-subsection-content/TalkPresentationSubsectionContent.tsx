import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel, IonList } from "@ionic/react";
import { useTalkPresentationModalStore } from "../../../../../../hooks/useTalkPresentationModalStore";

type Props = {
  sectionName: string;
  subsectionName: string;
  content: string;
};

function formatPercent(value: number) {
  const rounded = Math.round(value);
  const safeRounded = Object.is(rounded, -0) ? 0 : rounded;
  const sign = safeRounded > 0 ? "+" : "";
  return `${sign}${safeRounded}%`;
}

function formatDeltaMinutesSeconds(deltaMs: number) {
  const roundedSeconds = Math.round(deltaMs / 1000);
  const safeSeconds = Object.is(roundedSeconds, -0) ? 0 : roundedSeconds;
  const sign = safeSeconds > 0 ? "+" : safeSeconds < 0 ? "-" : "";
  const absSeconds = Math.abs(safeSeconds);
  const minutes = Math.floor(absSeconds / 60);
  const seconds = absSeconds % 60;
  return `${sign}${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function TalkPresentationSubsectionContent({
  sectionName,
  subsectionName,
  content,
}: Props) {
  const subsectionTimingAdjustmentPercent = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentPercent
  );
  const subsectionTimingAdjustmentMs = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentMs
  );
  const safeContent = content.trim().length ? content : "No content";

  return (
    <IonList lines="none">
      <Item>
        <IonLabel className="ion-text-nowrap">
          <Text bold size="sm" color="primary">
            {sectionName}
          </Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text bold size="xl">
            {subsectionName}
          </Text>
        </IonLabel>
      </Item>
      {subsectionTimingAdjustmentPercent !== null ? (
        <Item>
          <IonLabel>
            <Text size="sm" color="medium">
              Timing adjusted: {formatPercent(subsectionTimingAdjustmentPercent)}
              {subsectionTimingAdjustmentMs !== null
                ? ` (${formatDeltaMinutesSeconds(subsectionTimingAdjustmentMs)})`
                : ""}
            </Text>
          </IonLabel>
        </Item>
      ) : null}
      <Item>
        <IonLabel>
          <Text style={{ whiteSpace: "pre-wrap" }}>{safeContent}</Text>
        </IonLabel>
      </Item>
    </IonList>
  );
}
