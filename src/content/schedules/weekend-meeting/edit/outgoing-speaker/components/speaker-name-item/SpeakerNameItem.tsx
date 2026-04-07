import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";

/**
 * Displays the speaker name from the outgoing speaker assignment.
 */
export const SpeakerNameItem: FC = () => {
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);

  if (!assignment) {
    return null;
  }

  const speakerName = formatPublisherName(
    {
      first_name: assignment.first_name ?? "",
      last_name: assignment.last_name ?? "",
      display_name: assignment.display_name,
    },
    "display last",
  );

  return (
    <IonItem>
      <IonLabel>
        <Text size="xs" color="medium">
          Speaker
        </Text>
        <Text>{speakerName}</Text>
      </IonLabel>
    </IonItem>
  );
};
