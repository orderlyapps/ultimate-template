import { IonAccordionGroup } from "@ionic/react";
import {
  useHomeAccordionOrderStore,
  type HomeAccordionId,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { HomeAccordionItem } from "./components/home-accordion-item/HomeAccordionItem";

export function HomeAccordions() {
  const order = useHomeAccordionOrderStore((s) => s.order);
  const expandedIds = useHomeAccordionOrderStore((s) => s.expandedIds);
  const setExpandedIds = useHomeAccordionOrderStore((s) => s.setExpandedIds);

  const show = true;

  if (!show) return null;

  return (
    <IonAccordionGroup
      multiple
      value={expandedIds}
      onIonChange={(e) =>
        setExpandedIds((e.detail.value ?? []) as HomeAccordionId[])
      }
    >
      {order.map((id) => (
        <HomeAccordionItem key={id} id={id} />
      ))}
    </IonAccordionGroup>
  );
}
