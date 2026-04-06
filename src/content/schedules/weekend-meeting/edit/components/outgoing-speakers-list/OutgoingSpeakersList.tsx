import type { FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import { IonListHeader } from "@ionic/react";
import { formatPublisherName } from "@format/formatPublisherName";
import { useOutgoingSpeakers } from "../../hooks/useOutgoingSpeakers";

type Props = {
  weekId: string;
};

/**
 * Displays a list of speakers from the current congregation
 * who have speaking assignments in other congregations.
 */
export const OutgoingSpeakersList: FC<Props> = ({ weekId }) => {
  const { data: outgoingSpeakers } = useOutgoingSpeakers(weekId);

  if (!outgoingSpeakers || outgoingSpeakers.length === 0) {
    return null;
  }

  return (
    <>
      <IonListHeader>Outgoing Speakers</IonListHeader>
      {outgoingSpeakers.map((speaker) => {
        const name = formatPublisherName(speaker, "display last");

        return (
          <Item key={speaker.speakerId}>
            <Label>{name}</Label>
            <Text>
              {speaker.outlineTheme || "Unknown outline"}
              {" → "}
              {speaker.targetCongregationName || "Unknown congregation"}
            </Text>
          </Item>
        );
      })}
    </>
  );
};
