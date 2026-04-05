import { IonAccordion, IonLabel } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import {
  ACCORDION_LABELS,
  type HomeAccordionId,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { AssignmentsContent } from "../assignments-content/AssignmentsContent";
import { CalendarContent } from "../calendar-content/CalendarContent";
import { AnnouncementsContent } from "../announcements-content/AnnouncementsContent";
import { ToolsContent } from "../tools-content/ToolsContent";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { SectionHeading } from "@display/section-heading/SectionHeading";
// import { Space } from "@layout/space/Space";

type Props = {
  id: Exclude<HomeAccordionId, "notifications">;
};

const CONTENT_MAP: Record<Exclude<HomeAccordionId, "notifications">, React.FC> = {
  assignments: AssignmentsContent,
  calendar: CalendarContent,
  announcements: AnnouncementsContent,
  tools: ToolsContent,
};

export function HomeAccordionItem({ id }: Props) {
  const Content = CONTENT_MAP[id];

  return (
    <IonAccordion value={id}>
      <ItemAccordionHeader lines="none">
        <IonLabel>
          <SectionHeading>{ACCORDION_LABELS[id]}</SectionHeading>
        </IonLabel>
      </ItemAccordionHeader>
      <List slot="content" lines="none" className="ion-no-padding ion-no-margin">
        {/* <Space height="1" /> */}
        <Content />
        {/* <Space height="2" /> */}
      </List>
    </IonAccordion>
  );
}
