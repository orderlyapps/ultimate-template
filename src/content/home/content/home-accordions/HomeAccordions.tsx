import { IonAccordionGroup } from "@ionic/react";
import {
  useHomeAccordionOrderStore,
  type HomeAccordionId,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { HomeAccordionItem } from "./components/home-accordion-item/HomeAccordionItem";
import { useAuth } from "@services/app/auth/useAuth";
// import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { NotificationsAccordionItem } from "@/content/home/content/home-accordions/components/notifications-accordion-item/NotificationsAccordionItem";

export function HomeAccordions() {
  const order = useHomeAccordionOrderStore((s) => s.order);
  const expandedIds = useHomeAccordionOrderStore((s) => s.expandedIds);
  const setExpandedIds = useHomeAccordionOrderStore((s) => s.setExpandedIds);

  const { isAuthenticated } = useAuth();

  return (
    <IonAccordionGroup
      multiple
      value={expandedIds}
      onIonChange={(e) =>
        setExpandedIds((e.detail.value ?? []) as HomeAccordionId[])
      }
    >
      {order.map((id) => {
        if (id === "tools" && !isAuthenticated) return null;

        if (
          id === "announcements" 
          // && (!isUnlockedForDamian || !isDamianAllowed)
        )
          return null;

        if (id === "notifications")
          return <NotificationsAccordionItem key={id} />;

        return <HomeAccordionItem key={id} id={id} />;
      })}
    </IonAccordionGroup>
  );
}
