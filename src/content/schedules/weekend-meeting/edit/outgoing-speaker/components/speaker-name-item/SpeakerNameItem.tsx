import type { FC } from "react";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";
import { LocalSpeakerSelect } from "@feature/db/speaker_outline/components/local-speaker-select/LocalSpeakerSelect";
import type { LocalSpeaker } from "@feature/db/speaker_outline/components/local-speaker-select/hooks/useLocalSpeakers";

/**
 * Displays the speaker name from the outgoing speaker assignment.
 */
export const SpeakerNameItem: FC = () => {
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);

  if (!assignment) {
    return null;
  }

  /** Map the assignment to a LocalSpeaker value for the select */
  const selectedSpeaker: LocalSpeaker | null = assignment.speakerId
    ? {
        id: assignment.speakerId,
        first_name: assignment.first_name ?? "",
        last_name: assignment.last_name ?? "",
        display_name: assignment.display_name,
      }
    : null;

  const handleSelect = (speaker: LocalSpeaker) => {
    setAssignment({
      ...assignment,
      speakerId: speaker.id,
      first_name: speaker.first_name,
      last_name: speaker.last_name,
      display_name: speaker.display_name,
    });
  };

  return (
    <LocalSpeakerSelect
      value={selectedSpeaker}
      onSelect={handleSelect}
    />
  );
};
