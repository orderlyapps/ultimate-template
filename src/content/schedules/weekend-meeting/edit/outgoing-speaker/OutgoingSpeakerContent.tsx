import type { FC } from "react";
import { Text } from "@ionic-display/text/Text";

/**
 * Props for the OutgoingSpeakerContent component.
 */
type OutgoingSpeakerContentProps = {
  weekId: string;
  speakerId: string;
};

/**
 * Content component for displaying outgoing speaker details.
 * Placeholder implementation.
 */
export const OutgoingSpeakerContent: FC<OutgoingSpeakerContentProps> = ({
  weekId,
  speakerId,
}) => {
  return (
    <div className="ion-padding">
      <Text>Week ID: {weekId}</Text>
      <br />
      <Text>Speaker ID: {speakerId}</Text>
      <br />
      <Text color="medium">Placeholder content for outgoing speaker details</Text>
    </div>
  );
};
