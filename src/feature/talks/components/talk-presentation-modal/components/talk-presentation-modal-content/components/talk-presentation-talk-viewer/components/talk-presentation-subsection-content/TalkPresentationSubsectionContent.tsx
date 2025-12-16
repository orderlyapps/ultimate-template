import { Text } from "@ionic-display/text/Text";
import { IonList } from "@ionic/react";
import { Space } from "@layout/space/Space";

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
    <IonList>
      <Space height="1" />
      <Text bold size="lg">
        {sectionName}
      </Text>
      <Space height="1" />
      <Text bold size="xl">
        {subsectionName}
      </Text>
      <Space height="2" />
      <Text style={{ whiteSpace: "pre-wrap" }}>{safeContent}</Text>
    </IonList>
  );
}
