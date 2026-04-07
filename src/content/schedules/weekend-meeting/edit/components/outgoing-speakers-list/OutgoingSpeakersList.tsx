import type { FC } from "react";
import { useOutgoingSpeakers } from "../../hooks/useOutgoingSpeakers";
import { OutgoingSpeakersHeader } from "./outgoing-speakers-header/OutgoingSpeakersHeader";
import { OutgoingSpeakerItem } from "./outgoing-speaker-item/OutgoingSpeakerItem";

type Props = {
  weekId: string;
};

/**
 * Displays a list of speakers from the current congregation
 * who have speaking assignments in other congregations.
 */
export const OutgoingSpeakersList: FC<Props> = ({ weekId }) => {
  const { data: outgoingSpeakers } = useOutgoingSpeakers(weekId);

  // if (!outgoingSpeakers || outgoingSpeakers.length === 0) {
  //   return null;
  // }

  return (
    <>
      <OutgoingSpeakersHeader weekId={weekId} />
      {outgoingSpeakers.map((speaker) => (
        <OutgoingSpeakerItem key={speaker.speakerId} speaker={speaker} weekId={weekId} />
      ))}
    </>
  );
};
