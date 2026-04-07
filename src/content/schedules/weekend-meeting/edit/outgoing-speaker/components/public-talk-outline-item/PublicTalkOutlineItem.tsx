import type { FC } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";

/**
 * Displays the public talk outline theme from the outgoing speaker assignment.
 */
export const PublicTalkOutlineItem: FC = () => {
  const outlineTheme = useOutgoingSpeakerStore(
    (state) => state.assignment?.outlineTheme,
  );

  return (
    <IonItem>
      <IonLabel>
        <Text size="xs" color="medium">
          Public Talk Outline
        </Text>
        <Text>{outlineTheme || "Unknown outline"}</Text>
      </IonLabel>
    </IonItem>
  );
};
