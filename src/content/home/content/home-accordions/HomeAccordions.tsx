import { IonAccordionGroup } from "@ionic/react";
import {
  useHomeAccordionOrderStore,
  type HomeAccordionId,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";
import { HomeAccordionItem } from "./components/home-accordion-item/HomeAccordionItem";
import { useAppFeaturesStore } from "@services/app/features/useAppFeaturesStore";
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";

export function HomeAccordions() {
  const order = useHomeAccordionOrderStore((s) => s.order);
  const expandedIds = useHomeAccordionOrderStore((s) => s.expandedIds);
  const setExpandedIds = useHomeAccordionOrderStore((s) => s.setExpandedIds);

  const isTalksEnabled = useAppFeaturesStore((s) => s.isEnabled("talks"));
  const isMapPrintEnabled = useAppFeaturesStore((s) => s.isEnabled("mapPrint"));
  const { isUnlocked, isUserAllowed } = useFeatureAccess(["damian"]);

  const hasAnyToolEnabled = isTalksEnabled || isMapPrintEnabled;

  const showTools = hasAnyToolEnabled && isUnlocked && isUserAllowed;

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
      {order.map((id) => {
        if (id === "tools" && !showTools) return null;

        return <HomeAccordionItem key={id} id={id} />;
      })}
    </IonAccordionGroup>
  );
}
