import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import {
  IonCard,
  IonItemDivider,
  IonLabel,
  IonList,
} from "@ionic/react";
import { useTalkPresentationModalStore } from "../../../../../../hooks/useTalkPresentationModalStore";
import { useTalkPresentationSubsectionCountdown } from "../../../../../../hooks/useTalkPresentationSubsectionCountdown";
import { ProgressBar } from "../../../../../header/components/progress-bar/ProgressBar";
import { RTFEditor } from "@services/vendor/tiptap/editor/RTFEditor";
import { Grid } from "@ionic-layout/grid/Grid";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

type Props = {
  sectionName: string;
  subsectionName: string;
  content: string | Record<string, unknown>;
};

function formatDeltaMinutesSeconds(deltaMs: number) {
  const roundedSeconds = Math.round(deltaMs / 1000);
  const safeSeconds = Object.is(roundedSeconds, -0) ? 0 : roundedSeconds;
  const sign = safeSeconds > 0 ? "+" : safeSeconds < 0 ? "-" : "";
  const absSeconds = Math.abs(safeSeconds);
  const minutes = Math.floor(absSeconds / 60);
  const seconds = absSeconds % 60;
  return `${sign}${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function PresentationViewContent({
  sectionName,
  subsectionName,
  content,
}: Props) {
  const presentationTextSize = useTalksStore((state) => state.presentationTextSize);
  const subsectionTimingAdjustmentPercent = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentPercent
  );
  const subsectionTimingAdjustmentMs = useTalkPresentationModalStore(
    (s) => s.subsectionTimingAdjustmentMs
  );
  const subsectionStartMs = useTalkPresentationModalStore(
    (s) => s.subsectionStartMs
  );
  const subsectionEndMs = useTalkPresentationModalStore(
    (s) => s.subsectionEndMs
  );

  const safeContent = (() => {
    if (typeof content === "string") {
      return content.trim().length ? content : "No content";
    }
    return content;
  })();

  const countdown = useTalkPresentationSubsectionCountdown({
    subsectionStartMs,
    subsectionEndMs,
  });

  return (
    <>
      <IonItemDivider sticky>
        <Grid>
          <IonList lines="none">

   
          {subsectionTimingAdjustmentPercent !== null ? (
            <>
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
                      ? `${formatDeltaMinutesSeconds(
                          subsectionTimingAdjustmentMs
                        )}`
                      : ""}
                  </Text>
                </IonLabel>
              </Item>
            </>
          ) : null}
          {countdown ? (
            <Item>
              <ProgressBar value={countdown.progress} />
            </Item>
          ) : null}
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
          </IonList>
        </Grid>
      </IonItemDivider>
      <IonList lines="none">
        <IonCard className="ion-margin">
          <RTFEditor content={safeContent} canEdit={false} fontSize={presentationTextSize} />
        </IonCard>
      </IonList>
    </>
  );
}
