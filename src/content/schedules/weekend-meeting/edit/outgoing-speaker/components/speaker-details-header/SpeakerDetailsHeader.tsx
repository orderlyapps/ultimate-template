import type { FC } from "react";
import { IonItem } from "@ionic/react";
import { SectionHeading } from "@display/section-heading/SectionHeading";

/**
 * Header component for the speaker details list.
 */
export const SpeakerDetailsHeader: FC = () => {
  return (
    <IonItem lines="none">
      <SectionHeading>Outgoing Speaker Assignment</SectionHeading>
    </IonItem>
  );
};
