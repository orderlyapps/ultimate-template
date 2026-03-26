import { List } from "@ionic-layout/list/List";
import { SortBySelect } from "./components/sort-by-select/SortBySelect";
import { SortDirectionToggle } from "./components/sort-direction-toggle/SortDirectionToggle";
// import { FilterList } from "./components/filter-list/FilterList";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { usePublisherSortFilterStore } from "../../../../store/usePublisherSortFilterStore";
import { STAT_LABELS } from "../../../../store/publisher-sort-filter.types";
import { IonAccordion, IonAccordionGroup } from "@ionic/react";
import { useSortFilterAccordionsStore } from "@/content/schedules/weekend-meeting/edit/assignment/store/useSortFilterAccordionsStore";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";

export const SortConfig: React.FC = () => {
  const activeConfig = usePublisherSortFilterStore((state) =>
    state.getActiveConfig(),
  );

  const sortAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.sortAccordionOpen,
  );
  const setSortAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.setSortAccordionOpen,
  );

  return (
    <IonAccordionGroup
      value={sortAccordionOpen ? "sort" : undefined}
      onIonChange={(e) => setSortAccordionOpen(e.detail.value === "sort")}
    >
      <IonAccordion value="sort">
        <ItemAccordionHeader lines={sortAccordionOpen ? "none" : undefined}>
          <Label>Sort By</Label>
          <Text className="ion-padding-end">
            {STAT_LABELS[activeConfig.sortBy]}
          </Text>
        </ItemAccordionHeader>
        <List slot="content" inset>
          <SortDirectionToggle />
          <SortBySelect />
          <Space height="2" />
        </List>
      </IonAccordion>
    </IonAccordionGroup>
  );
};
