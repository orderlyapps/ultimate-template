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

type AddVisitingSpeakerFormInnerProps = {
  congregations: Congregation[];
  onClose: () => void;
};

export const AddVisitingSpeakerFormInner: React.FC<
  AddVisitingSpeakerFormInnerProps
> = ({ congregations, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [congregationId, setCongregationId] = useState("");
  const [speakerId, setSpeakerId] = useState<string | null>(null);
  const [selectedOutlineIds, setSelectedOutlineIds] = useState<string[]>([]);

  const handleToggleOutline = (outlineId: string) => {
    setSelectedOutlineIds((prev) =>
      prev.includes(outlineId)
        ? prev.filter((id) => id !== outlineId)
        : [...prev, outlineId],
    );
  };

  const handleCreateSpeaker = () => {
    if (!congregationId) return;

    const newSpeakerId = crypto.randomUUID();
    publisherCollection.insert({
      id: newSpeakerId,
      congregation_id: congregationId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      display_name: null,
      middle_name: null,
      family_id: null,
      group_id: null,
      gender: "male",
      standing: "elder",
      type: "speaker",
    });

    setSpeakerId(newSpeakerId);
  };

  const handleSaveOutlines = () => {
    if (!speakerId) return;

    selectedOutlineIds.forEach((outlineId) => {
      speakerOutlineCollection.insert({
        speaker_id: speakerId,
        outline_id: outlineId,
      });
    });

    onClose();
  };

  const canCreate =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    congregationId.length > 0;

  return (
    <>
      <SpeakerNameForm
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        congregationId={congregationId}
        setCongregationId={setCongregationId}
        congregations={congregations}
      />

      {!speakerId && (
        <Button onClick={handleCreateSpeaker} disabled={!canCreate}>
          Save & Add Outlines
        </Button>
      )}

      {speakerId && (
        <>
          <SpeakerOutlinesForm
            selectedOutlineIds={selectedOutlineIds}
            onToggleOutline={handleToggleOutline}
          />

          <Button onClick={handleSaveOutlines}>
            Save Outlines
          </Button>
        </>
      )}

      <Space />
    </>
  );
};
