import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { IonAccordion, IonLabel } from "@ionic/react";
import type { SpeakerWithOutlines } from "../../utils/groupSpeakersWithOutlines";
import { useWeekendMeetingEditStore } from "@feature/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { EditSpeakerModal } from "@feature/weekend-meeting/edit-speaker/EditSpeakerForm";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";
import { sortByNumberString } from "@sort/sortByNumberString";

type SpeakerAccordionProps = {
  speaker: SpeakerWithOutlines;
  currentSpeakerId?: string | null;
  currentOutlineId?: string | null;
  openAccordion: string | undefined;
};

export const SpeakerAccordion: React.FC<SpeakerAccordionProps> = ({
  speaker,
  currentSpeakerId,
  currentOutlineId,
  openAccordion,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const selectSpeaker = useWeekendMeetingEditStore((s) => s.selectSpeaker);

  return (
    <IonAccordion value={speaker.id}>
      <ItemAccordionHeader
        lines={openAccordion === speaker.id ? "none" : "inset"}
      >
        <Text>{speaker.name}</Text>
        {!speaker.isLocal && (
          <Text color="medium"> - {speaker.congregationName}</Text>
        )}
      </ItemAccordionHeader>
      <List slot="content">
        <Item
          key="tbc"
          onClick={() => selectSpeaker(speaker.id, null)}
          color={
            currentSpeakerId === speaker.id && currentOutlineId === null
              ? "medium"
              : undefined
          }
          lines="none"
        >
          <Text
            bold={currentSpeakerId === speaker.id && currentOutlineId === null}
            color="medium"
            slot="end"
            size="xs"
          >
            TBC
          </Text>
        </Item>
        {speaker.outlines.sort(sortByNumberString("id")).map((outline) => (
          <Item
            key={outline.id}
            onClick={() => selectSpeaker(speaker.id, outline.id)}
            color={
              currentSpeakerId === speaker.id && currentOutlineId === outline.id
                ? "medium"
                : undefined
            }
            lines="none"
          >
            <IonLabel>
              <Text size="xs">{outline.id}</Text>
            </IonLabel>
            <Text
              bold={
                currentSpeakerId === speaker.id &&
                currentOutlineId === outline.id
              }
              slot="end"
              size="xs"
              className="ion-text-nowrap"
            >
              {outline.theme}
            </Text>
          </Item>
        ))}
        <Item onClick={() => setIsEditModalOpen(true)} lines="none">
          <Text color="primary" size="sm" slot="end">
            Edit
          </Text>
        </Item>
        <Space height="2" />
      </List>

      <EditSpeakerModal
        speakerId={speaker.id}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </IonAccordion>
  );
};
