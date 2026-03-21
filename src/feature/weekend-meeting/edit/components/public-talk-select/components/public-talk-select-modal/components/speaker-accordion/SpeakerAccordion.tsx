import { useState } from "react";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { IonAccordion, IonIcon } from "@ionic/react";
import editIcon from "@icons/edit.svg";
import type { SpeakerWithOutlines } from "../../utils/groupSpeakersWithOutlines";
import { useWeekendMeetingEditStore } from "@feature/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { EditSpeakerModal } from "@feature/weekend-meeting/edit-speaker/EditSpeakerForm";

type SpeakerAccordionProps = {
  speaker: SpeakerWithOutlines;
  currentSpeakerId?: string | null;
  currentOutlineId?: string | null;
};

export const SpeakerAccordion: React.FC<SpeakerAccordionProps> = ({
  speaker,
  currentSpeakerId,
  currentOutlineId,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const selectSpeaker = useWeekendMeetingEditStore((s) => s.selectSpeaker);

  return (
    <IonAccordion value={speaker.id}>
      <Item slot="header">
        <Label>
          <Text bold>{speaker.name}</Text>
          {!speaker.isLocal && (
            <Text color="medium"> - {speaker.congregationName}</Text>
          )}
        </Label>
      </Item>
      <List slot="content">
        <Item
          key="tbc"
          onClick={() => selectSpeaker(speaker.id, null)}
          color={
            currentSpeakerId === speaker.id && currentOutlineId === null
              ? "medium"
              : undefined
          }
        >
          <Text
            bold={currentSpeakerId === speaker.id && currentOutlineId === null}
            color="medium"
          >
            TBC
          </Text>
        </Item>
        {speaker.outlines.map((outline) => (
          <Item
            key={outline.id}
            onClick={() => selectSpeaker(speaker.id, outline.id)}
            color={
              currentSpeakerId === speaker.id && currentOutlineId === outline.id
                ? "medium"
                : undefined
            }
          >
            <Text
              bold={
                currentSpeakerId === speaker.id &&
                currentOutlineId === outline.id
              }
            >
              {outline.theme}
            </Text>
          </Item>
        ))}
        <Item onClick={() => setIsEditModalOpen(true)} detail>
          <IonIcon src={editIcon} slot="start" color="primary" />
          <Text color="primary">Edit Speaker</Text>
        </Item>
      </List>

      <EditSpeakerModal
        speakerId={speaker.id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </IonAccordion>
  );
};
