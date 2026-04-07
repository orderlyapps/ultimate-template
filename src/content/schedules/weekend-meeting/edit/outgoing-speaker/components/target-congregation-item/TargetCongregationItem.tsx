import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";

/**
 * Displays the target congregation name from the outgoing speaker assignment.
 */
export const TargetCongregationItem: FC = () => {
  const targetCongregationName = useOutgoingSpeakerStore(
    (state) => state.assignment?.targetCongregationName,
  );

  return (
    <IonItem>
      <IonLabel>
        <Text size="xs" color="medium">
          Target Congregation
        </Text>
        <Text>{targetCongregationName || "Unknown congregation"}</Text>
      </IonLabel>
    </IonItem>
  );
};
