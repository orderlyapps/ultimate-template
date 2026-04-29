import { IonAccordion, IonLabel } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import {
  ACCORDION_LABELS,
  type HomeAccordionId,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { AssignmentsContent } from "./content/assignments-content/AssignmentsContent";
import { CalendarContent } from "./content/calendar-content/CalendarContent";
import { AnnouncementsContent } from "./content/announcements-content/AnnouncementsContent";
import { ToolsContent } from "./content/tools-content/ToolsContent";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { SectionHeading } from "@display/section-heading/SectionHeading";

type Props = {
  id: Exclude<HomeAccordionId, "notifications">;
};

const CONTENT_MAP: Record<
  Exclude<HomeAccordionId, "notifications">,
  React.FC
> = {
  assignments: AssignmentsContent,
  calendar: CalendarContent,
  announcements: AnnouncementsContent,
  tools: ToolsContent,
};

export function HomeAccordionItem({ id }: Props) {
  const Content = CONTENT_MAP[id];

  return (
    <IonAccordion value={id} id="no-lines">
      <ItemAccordionHeader lines="none">
        <IonLabel className="ion-margin">
          <SectionHeading>{ACCORDION_LABELS[id]}</SectionHeading>
        </IonLabel>
      </ItemAccordionHeader>
      <List slot="content" lines="none">
        <Content />
      </List>
    </IonAccordion>
  );
}
