import { Textarea } from "@ionic-input/textarea/Textarea";
import { Space } from "@layout/space/Space";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { IonCardContent, IonCardHeader, IonLabel } from "@ionic/react";
import type { Subsection } from "@feature/talks/state/useTalksStore";
import { Card } from "@ionic-display/card/Card";
import { CardSubtitle } from "@ionic-display/card/card-subtitle/CardSubtitle";
import { Item } from "@ionic-layout/item/Item";
import { TimeAllocationStepper } from "@feature/talks/components/page-contents/subsection/time-allocation-stepper/TimeAllocationStepper";
import { SubsectionDetailsHelp } from "./components/SubsectionDetailsHelp";

type Props = {
  talkId: string;
  sectionId: string;
  subsection: Subsection;
};

export function SubsectionDetails({ talkId, sectionId, subsection }: Props) {
  const updateSubsection = useTalksStore((s) => s.updateSubsection);

  return (
    <>
      <SubsectionDetailsHelp />
      <Space height="2" />
      <Item lines="none">
        <IonLabel>
          <TimeAllocationStepper
            valueSeconds={subsection.timeAllocation}
            onChange={(nextSeconds) => {
              updateSubsection(talkId, sectionId, subsection.id, {
                timeAllocation: nextSeconds,
              });
            }}
          />
        </IonLabel>
      </Item>

      <Card>
        <IonCardHeader>
          <CardSubtitle>Content</CardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <Textarea
            value={subsection.content}
            onIonChange={(e) => {
              updateSubsection(talkId, sectionId, subsection.id, {
                content: e.detail.value ?? "",
              });
            }}
            placeholder="Enter text content here..."
          />
        </IonCardContent>
      </Card>
    </>
  );
}
