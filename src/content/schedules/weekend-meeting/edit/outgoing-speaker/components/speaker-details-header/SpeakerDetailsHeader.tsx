import type { FC } from "react";
import { IonListHeader } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";

/**
 * Header component for the speaker details list.
 */
export const SpeakerDetailsHeader: FC = () => {
  return (
    <IonListHeader>
      <Text size="md" bold>
        Speaker Details
      </Text>
    </IonListHeader>
  );
};
