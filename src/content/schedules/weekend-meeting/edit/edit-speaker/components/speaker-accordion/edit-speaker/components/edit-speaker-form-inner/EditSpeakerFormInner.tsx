import { useState } from "react";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { SpeakerNameForm } from "../speaker-name-form/SpeakerNameForm";
import { SpeakerOutlinesForm } from "../speaker-outlines-form/SpeakerOutlinesForm";

type Congregation = {
  id: string;
  name: string;
};

type EditSpeakerFormInnerProps = {
  speakerId: string;
  initialFirstName: string;
  initialLastName: string;
  initialCongregationId: string;
  initialOutlineIds: string[];
  congregationName: string;
  congregations: Congregation[];
  isLocal: boolean;
  onClose: () => void;
};

export const EditSpeakerFormInner: React.FC<EditSpeakerFormInnerProps> = ({
  speakerId,
  initialFirstName,
  initialLastName,
  initialCongregationId,
  initialOutlineIds,
  congregationName,
  congregations,
  isLocal,
  onClose,
}) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [congregationId, setCongregationId] = useState(initialCongregationId);
  const [selectedOutlineIds, setSelectedOutlineIds] =
    useState<string[]>(initialOutlineIds);

  const handleToggleOutline = (outlineId: string) => {
    setSelectedOutlineIds((prev) =>
      prev.includes(outlineId)
        ? prev.filter((id) => id !== outlineId)
        : [...prev, outlineId],
    );
  };

  const handleSave = () => {
    publisherCollection.update(speakerId, (draft) => {
      draft.first_name = firstName.trim();
      draft.last_name = lastName.trim();
      if (!isLocal) {
        draft.congregation_id = congregationId;
      }
    });

    const toAdd = selectedOutlineIds.filter(
      (id) => !initialOutlineIds.includes(id),
    );
    const toRemove = initialOutlineIds.filter(
      (id) => !selectedOutlineIds.includes(id),
    );

    toAdd.forEach((outlineId) => {
      speakerOutlineCollection.insert({
        speaker_id: speakerId,
        outline_id: outlineId,
      });
    });

    toRemove.forEach((outlineId) => {
      const key = speakerId + outlineId;
      speakerOutlineCollection.delete(key);
    });

    onClose();
  };

  const canSave = firstName.trim().length > 0 && lastName.trim().length > 0;

  return (
    <>
      <SpeakerNameForm
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        congregationId={congregationId}
        setCongregationId={setCongregationId}
        congregationName={congregationName}
        congregations={congregations}
        isLocal={isLocal}
      />

      <SpeakerOutlinesForm
        selectedOutlineIds={selectedOutlineIds}
        onToggleOutline={handleToggleOutline}
      />

      <Button onClick={handleSave} disabled={!canSave}>
        Save Changes
      </Button>

      <Space />
    </>
  );
};
