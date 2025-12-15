import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { Input } from "@ionic-input/input/Input";
import { Textarea } from "@ionic-input/textarea/Textarea";
import { Space } from "@layout/space/Space";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { IonCardContent, IonCardHeader, IonItem } from "@ionic/react";
import type { Subsection } from "@feature/talks/state/useTalksStore";
import { Card } from "@ionic-display/card/Card";
import { CardSubtitle } from "@ionic-display/card/card-subtitle/CardSubtitle";

type Props = {
  talkId: string;
  sectionId: string;
  subsection: Subsection;
  talkName: string;
  sectionName: string;
};

export function TalkSubsectionDetails({
  talkId,
  sectionId,
  subsection,
  talkName,
  sectionName,
}: Props) {
  const updateSubsection = useTalksStore((s) => s.updateSubsection);

  return (
    <>
      <Text size="lg">{talkName}</Text>
      <Space height="2" />
      <Text>{sectionName}</Text>
      <Space height="2" />
      <IonItem>
        <Label>Time allocation (seconds)</Label>
        <Input
          slot="end"
          type="number"
          inputMode="numeric"
          value={subsection.timeAllocation}
          onIonChange={(e) => {
            const raw = e.detail.value;
            const next = raw === "" || raw == null ? 0 : Number(raw);

            updateSubsection(talkId, sectionId, subsection.id, {
              timeAllocation: Number.isFinite(next) ? next : 0,
            });
          }}
        />
      </IonItem>
      <Space height="2" />

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
