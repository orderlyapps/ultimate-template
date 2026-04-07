import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";

/**
 * Displays the week identifier from the outgoing speaker store.
 */
export const WeekItem: FC = () => {
  const weekId = useOutgoingSpeakerStore((state) => state.weekId);

  if (!weekId) {
    return null;
  }

  return (
    <IonItem>
      <IonLabel>
        <Text size="xs" color="medium">
          Week
        </Text>
        <Text>{weekId}</Text>
      </IonLabel>
    </IonItem>
  );
};
