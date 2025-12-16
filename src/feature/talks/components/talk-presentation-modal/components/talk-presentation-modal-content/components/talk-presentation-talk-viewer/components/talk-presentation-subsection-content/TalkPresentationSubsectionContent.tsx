import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";

type Props = {
  sectionName: string;
  subsectionName: string;
  content: string;
  indexDisplay: string;
};

export function TalkPresentationSubsectionContent({
  sectionName,
  subsectionName,
  content,
  indexDisplay,
}: Props) {
  const safeContent = content.trim().length ? content : "No content";

  return (
    <>
      <Text size="sm">{indexDisplay}</Text>
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
    </>
  );
}
