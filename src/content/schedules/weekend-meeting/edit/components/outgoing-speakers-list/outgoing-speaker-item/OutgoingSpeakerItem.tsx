import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { IonLabel } from "@ionic/react";

type OutgoingSpeaker = {
  speakerId: string;
  first_name: string;
  last_name: string;
  display_name: string | null | undefined;
  outlineTheme: string | undefined;
  targetCongregationName: string | undefined;
};

type OutgoingSpeakerItemProps = {
  speaker: OutgoingSpeaker;
};

/**
 * Displays a single outgoing speaker with their
 * outline and target congregation.
 */
export const OutgoingSpeakerItem: FC<OutgoingSpeakerItemProps> = ({
  speaker,
}) => {
  const name = formatPublisherName(speaker, "display last");

  return (
    <Item key={speaker.speakerId}>
      <IonLabel>
        <Text bold>{name}</Text>
        <Text size="xs" color={"medium"}>
          {" ("}
          {speaker.targetCongregationName || "Unknown congregation"}
          {")"}
        </Text>
        <br />
        <Text size="xs" color={"medium"}>
          {speaker.outlineTheme || "Unknown outline"}
          <br />
        </Text>
      </IonLabel>
    </Item>
  );
};
