import { IonAccordion, IonBadge, IonLabel } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { ACCORDION_LABELS } from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { usePublisherHomeItems } from "@/content/home/content/home-accordions/components/notifications-accordion-item/notifications-content/hooks/usePublisherHomeItems";
import { useNewAssignments } from "@/content/home/content/home-accordions/components/notifications-accordion-item/notifications-content/hooks/useNewAssignments";
import { NotificationsContent } from "@/content/home/content/home-accordions/components/notifications-accordion-item/notifications-content/NotificationsContent";

export function NotificationsAccordionItem() {
  const [publisher] = useUserPublisher();
  const items = usePublisherHomeItems(publisher);
  const { newItems, dismiss, dismissAll } = useNewAssignments(items);

  if (newItems.length < 1) return null;

  return (
    <IonAccordion value="notifications" id="no-lines-xxx">
      <ItemAccordionHeader>
        <IonLabel className="ion-margin-vertical">
          <SectionHeading>{ACCORDION_LABELS.notifications}</SectionHeading>
        </IonLabel>
        <IonBadge color="medium" className="ion-margin-end">
          {newItems.length}
        </IonBadge>
      </ItemAccordionHeader>
      <List slot="content" lines="none">
        <NotificationsContent
          newItems={newItems}
          dismiss={dismiss}
          dismissAll={dismissAll}
        />
      </List>
    </IonAccordion>
  );
}
