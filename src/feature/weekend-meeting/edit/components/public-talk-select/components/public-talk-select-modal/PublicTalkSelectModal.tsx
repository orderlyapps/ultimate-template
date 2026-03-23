import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { List } from "@ionic-layout/list/List";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import {
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  type AccordionGroupCustomEvent,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { Button } from "@ionic-input/button/Button";
import { useWeekendMeetingEditStore } from "@feature/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import {
  groupSpeakersWithOutlines,
  filterSpeakers,
} from "./utils/groupSpeakersWithOutlines";
import { SpeakerAccordion } from "./components/speaker-accordion/SpeakerAccordion";
import { AddVisitingSpeakerModal } from "./components/add-visiting-speaker/AddVisitingSpeakerModal";
import { Space } from "@layout/space/Space";
import { useState } from "react";

type PublicTalkSelectModalProps = {
  currentSpeakerId?: string | null;
  currentOutlineId?: string | null;
};

export const PublicTalkSelectModal: React.FC<PublicTalkSelectModalProps> = ({
  currentSpeakerId,
  currentOutlineId,
}) => {
  const isOpen = useWeekendMeetingEditStore((s) => s.isModalOpen);
  const closeModal = useWeekendMeetingEditStore((s) => s.closeModal);
  const searchQuery = useWeekendMeetingEditStore((s) => s.searchQuery);
  const setSearchQuery = useWeekendMeetingEditStore((s) => s.setSearchQuery);
  const deleteAssignment = useWeekendMeetingEditStore(
    (s) => s.deleteAssignment,
  );
  const congregationId = useWeekendMeetingEditStore((s) => s.congregationId);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);

  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      firstName: p.first_name,
      middleName: p.middle_name,
      lastName: p.last_name,
      displayName: p.display_name,
      congregationId: p.congregation_id,
    })),
  );

  const { data: speakerOutlines = [] } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }).select(({ so }) => ({
      speakerId: so.speaker_id,
      outlineId: so.outline_id,
    })),
  );

  const { data: outlines = [] } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).select(({ o }) => ({
      id: o.id,
      theme: o.theme,
    })),
  );

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      name: c.name,
    })),
  );

  const speakersWithOutlines = groupSpeakersWithOutlines(
    publishers,
    speakerOutlines,
    outlines,
    congregations,
    congregationId,
  );

  const filteredSpeakers = filterSpeakers(speakersWithOutlines, searchQuery);
  const localSpeakers = filteredSpeakers.filter((s) => s.isLocal);
  const visitingSpeakers = filteredSpeakers.filter((s) => !s.isLocal);

  const [openAccordion, setOpenAccordion] = useState();
  const accordionGroupChange = (event: AccordionGroupCustomEvent) => {
    setOpenAccordion(event.detail.value);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Public Talk</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={closeModal} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search speakers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {currentSpeakerId && (
          <Button onClick={deleteAssignment} color={"danger"}>
            Clear Assignment
          </Button>
        )}
        {localSpeakers.length > 0 && (
          <List>
            <IonListHeader>
              <Label color="medium">Local Speakers</Label>
            </IonListHeader>
            <IonAccordionGroup onIonChange={accordionGroupChange}>
              {localSpeakers.map((speaker) => (
                <SpeakerAccordion
                  key={speaker.id}
                  speaker={speaker}
                  currentSpeakerId={currentSpeakerId}
                  currentOutlineId={currentOutlineId}
                  openAccordion={openAccordion}
                />
              ))}
            </IonAccordionGroup>
          </List>
        )}

        {visitingSpeakers.length > 0 && (
          <List>
            <IonListHeader>
              <Label color="medium">Visiting Speakers</Label>
            </IonListHeader>
            <IonAccordionGroup>
              {visitingSpeakers.map((speaker) => (
                <SpeakerAccordion
                  key={speaker.id}
                  speaker={speaker}
                  currentSpeakerId={currentSpeakerId}
                  currentOutlineId={currentOutlineId}
                  openAccordion={openAccordion}
                />
              ))}
            </IonAccordionGroup>
          </List>
        )}

        {speakersWithOutlines.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <Text color="medium">No speakers with outlines available</Text>
          </div>
        )}

        <Space height="2" />

        <Button onClick={() => setShowAddSpeaker(true)}>Add Visiting Speaker</Button>

        <AddVisitingSpeakerModal
          isOpen={showAddSpeaker}
          onClose={() => setShowAddSpeaker(false)}
        />

        <Space />
      </IonContent>
    </IonModal>
  );
};
