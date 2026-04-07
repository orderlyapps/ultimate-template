import type { FC } from "react";
import { IonListHeader } from "@ionic/react";

/**
 * Header component for the speaker details list.
 */
export const SpeakerDetailsHeader: FC = () => {
  return (
    <IonListHeader>
        Outgoing Speaker Assignment
    </IonListHeader>
  );
};
