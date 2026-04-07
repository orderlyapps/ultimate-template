import type { FC } from "react";
import { useOutgoingSpeakerStore } from "../../store/useOutgoingSpeakerStore";
import { LocalSpeakerSelect } from "@feature/db/speaker_outline/components/local-speaker-select/LocalSpeakerSelect";
import type { LocalSpeaker } from "@feature/db/speaker_outline/components/local-speaker-select/hooks/useLocalSpeakers";

/**
 * Displays the speaker name from the outgoing speaker assignment.
 * In add mode, allows selecting a speaker to create a new assignment.
 */
export const SpeakerNameItem: FC = () => {
  const assignment = useOutgoingSpeakerStore((state) => state.assignment);
  const setAssignment = useOutgoingSpeakerStore((state) => state.setAssignment);

  /** Map the assignment to a LocalSpeaker value for the select */
  const selectedSpeaker: LocalSpeaker | null = assignment?.speakerId
    ? {
        id: assignment.speakerId,
        first_name: assignment.first_name ?? "",
        last_name: assignment.last_name ?? "",
        display_name: assignment.display_name,
      }
    : null;

  const handleSelect = (speaker: LocalSpeaker) => {
    // Create new assignment object if none exists
    const baseAssignment = assignment ?? {
      speakerId: "",
      first_name: null,
      last_name: null,
      display_name: null,
      outlineId: null,
      outlineTheme: null,
      targetCongregationId: null,
      targetCongregationName: null,
    };

    setAssignment({
      ...baseAssignment,
      speakerId: speaker.id,
      first_name: speaker.first_name,
      last_name: speaker.last_name,
      display_name: speaker.display_name,
      outlineId: null,
      outlineTheme: null,
    });
  };

  return (
    <LocalSpeakerSelect
      value={selectedSpeaker}
      onSelect={handleSelect}
    />
  );
};
