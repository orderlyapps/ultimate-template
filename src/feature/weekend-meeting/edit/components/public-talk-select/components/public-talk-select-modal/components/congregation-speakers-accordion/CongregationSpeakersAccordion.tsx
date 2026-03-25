import {
  IonAccordion,
  IonAccordionGroup,
  type AccordionGroupCustomEvent,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { SpeakerAccordion } from "../speaker-accordion/SpeakerAccordion";
import type { CongregationGroup } from "../../utils/groupSpeakersWithOutlines";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";

type CongregationSpeakersAccordionProps = {
  group: CongregationGroup;
  currentSpeakerId?: string | null;
  currentOutlineId?: string | null;
  openAccordion: string | undefined;
  onAccordionChange: (event: AccordionGroupCustomEvent) => void;
};

export const CongregationSpeakersAccordion: React.FC<
  CongregationSpeakersAccordionProps
> = ({
  group,
  currentSpeakerId,
  currentOutlineId,
  openAccordion,
  onAccordionChange,
}) => (
  <IonAccordion value={`visiting-${group.congregationId}`}>
    <ItemAccordionHeader>
      <Text bold>{group.congregationName}</Text>
    </ItemAccordionHeader>
    <List slot="content">
      <IonAccordionGroup onIonChange={onAccordionChange}>
        {group.speakers.map((speaker) => (
          <SpeakerAccordion
            key={speaker.id}
            speaker={speaker}
            currentSpeakerId={currentSpeakerId}
            currentOutlineId={currentOutlineId}
            openAccordion={openAccordion}
          />
        ))}
      </IonAccordionGroup>
      <Space height="2"/>
    </List>
  </IonAccordion>
);
