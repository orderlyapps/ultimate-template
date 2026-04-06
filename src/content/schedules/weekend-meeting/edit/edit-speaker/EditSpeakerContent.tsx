import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { List } from "@ionic-layout/list/List";
import {
  IonAccordion,
  IonAccordionGroup,
  type AccordionGroupCustomEvent,
} from "@ionic/react";
import { useWeekendMeetingEditStore } from "@/content/schedules/weekend-meeting/edit/store/useWeekendMeetingEditStore";
import { SpeakerAccordion } from "@/content/schedules/weekend-meeting/edit/edit-speaker/components/speaker-accordion/SpeakerAccordion";
import { CongregationSpeakersAccordion } from "@/content/schedules/weekend-meeting/edit/edit-speaker/components/congregation-speakers-accordion/CongregationSpeakersAccordion";
import { AddVisitingSpeakerModal } from "@/content/schedules/weekend-meeting/edit/edit-speaker/components/add-visiting-speaker/AddVisitingSpeakerModal";
import { useCurrentAssignment } from "./hooks/useCurrentAssignment";
import { useSpeakerData } from "./hooks/useSpeakerData";

/**
 * Content component for the Edit Speaker page.
 * Displays the speaker selection list with search, local/visiting grouping,
 * and the ability to add visiting speakers.
 */
export const EditSpeakerContent: React.FC = () => {
  const searchQuery = useWeekendMeetingEditStore((s) => s.searchQuery);
  const deleteAssignment = useWeekendMeetingEditStore((s) => s.deleteAssignment);
  const congregationId = useWeekendMeetingEditStore((s) => s.congregationId);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>();
  const { currentSpeakerId, currentOutlineId } = useCurrentAssignment();

  const { speakersWithOutlines, localSpeakers, congregationGroups } = useSpeakerData(
    searchQuery,
    congregationId ?? undefined,
  );

  const accordionGroupChange = (event: AccordionGroupCustomEvent) => {
    setOpenAccordion(event.detail.value as string | undefined);
  };

  return (
    <>
      <Space height="1.5" />
      {currentSpeakerId && (
        <Button onClick={deleteAssignment} color="danger">
          Clear Assignment
        </Button>
      )}

      <Space height="1.5" />

      <IonAccordionGroup multiple>
        {localSpeakers.length > 0 && (
          <IonAccordion value="local">
            <ItemAccordionHeader>
              <SectionHeading>Local Speakers</SectionHeading>
            </ItemAccordionHeader>
            <List slot="content">
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
          </IonAccordion>
        )}

        {congregationGroups.length > 0 && (
          <IonAccordion value="visiting">
            <ItemAccordionHeader>
              <SectionHeading>Visiting Speakers</SectionHeading>
            </ItemAccordionHeader>
            <List slot="content">
              <IonAccordionGroup multiple>
                {congregationGroups.map((group) => (
                  <CongregationSpeakersAccordion
                    key={group.congregationId}
                    group={group}
                    currentSpeakerId={currentSpeakerId}
                    currentOutlineId={currentOutlineId}
                    openAccordion={openAccordion}
                    onAccordionChange={accordionGroupChange}
                  />
                ))}
              </IonAccordionGroup>
            </List>
          </IonAccordion>
        )}
      </IonAccordionGroup>

      {speakersWithOutlines.length === 0 && (
        <section style={{ padding: "2rem", textAlign: "center" }}>
          <Text color="medium">No speakers with outlines available</Text>
        </section>
      )}

      <Space height="3" />

      <Button onClick={() => setShowAddSpeaker(true)}>Add Visiting Speaker</Button>

      <AddVisitingSpeakerModal
        isOpen={showAddSpeaker}
        onClose={() => setShowAddSpeaker(false)}
      />

      <Space />
    </>
  );
};
