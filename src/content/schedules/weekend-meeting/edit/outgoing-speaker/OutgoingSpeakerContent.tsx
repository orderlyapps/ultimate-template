import type { FC } from "react";
import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { useOutgoingSpeakerAssignment } from "./hooks/useOutgoingSpeakerAssignment";

/**
 * Props for the OutgoingSpeakerContent component.
 */
type OutgoingSpeakerContentProps = {
  weekId: string;
  speakerId: string;
};

/**
 * Content component for displaying outgoing speaker details.
 * Shows the speaker name, outline theme, and target congregation.
 */
export const OutgoingSpeakerContent: FC<OutgoingSpeakerContentProps> = ({
  weekId,
  speakerId,
}) => {
  const { data: assignment } = useOutgoingSpeakerAssignment(weekId, speakerId);

  if (!assignment) {
    return (
      <div className="ion-padding">
        <Text color="medium">Loading speaker details...</Text>
      </div>
    );
  }

  const speakerName = formatPublisherName(
    {
      first_name: assignment.first_name,
      last_name: assignment.last_name,
      display_name: assignment.display_name,
    },
    "display last",
  );

  return (
    <IonList>
      <IonListHeader>
        <Text size="md" bold>
          Speaker Details
        </Text>
      </IonListHeader>

      <IonItem>
        <IonLabel>
          <Text size="xs" color="medium">
            Speaker
          </Text>
          <Text>{speakerName}</Text>
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Text size="xs" color="medium">
            Target Congregation
          </Text>
          <Text>
            {assignment.targetCongregationName || "Unknown congregation"}
          </Text>
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Text size="xs" color="medium">
            Public Talk Outline
          </Text>
          <Text>{assignment.outlineTheme || "Unknown outline"}</Text>
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Text size="xs" color="medium">
            Week
          </Text>
          <Text>{weekId}</Text>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};
