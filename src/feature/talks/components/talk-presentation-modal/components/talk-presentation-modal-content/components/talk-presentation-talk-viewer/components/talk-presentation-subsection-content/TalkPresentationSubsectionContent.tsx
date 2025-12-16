import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel, IonList } from "@ionic/react";

type Props = {
  sectionName: string;
  subsectionName: string;
  content: string;
};

export function TalkPresentationSubsectionContent({
  sectionName,
  subsectionName,
  content,
}: Props) {
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
      <Item>
        <IonLabel>
          <Text style={{ whiteSpace: "pre-wrap" }}>{safeContent}</Text>
        </IonLabel>
      </Item>
    </IonList>
  );
}
