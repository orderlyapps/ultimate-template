import { List } from "@ionic-layout/list/List";
import { FilterList } from "./components/filter-list/FilterList";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { usePublisherSortFilterStore } from "../../../../store/usePublisherSortFilterStore";
import { IonAccordion, IonAccordionGroup } from "@ionic/react";
import { useSortFilterAccordionsStore } from "@/content/schedules/weekend-meeting/edit/assignment/store/useSortFilterAccordionsStore";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";

export const FilterConfig: React.FC = () => {
  const activeConfig = usePublisherSortFilterStore((state) =>
    state.getActiveConfig(),
  );

  const filterAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.filterAccordionOpen,
  );
  const setFilterAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.setFilterAccordionOpen,
  );

  return (
    <IonAccordionGroup
      value={filterAccordionOpen ? "filter" : undefined}
      onIonChange={(e) => setFilterAccordionOpen(e.detail.value === "filter")}
    >
      <IonAccordion value="filter">
        <ItemAccordionHeader lines={filterAccordionOpen ? "none" : undefined}>
          <Label>Filters</Label>
          <Text className="ion-padding-end">{activeConfig.filters.length}</Text>
        </ItemAccordionHeader>
        <List slot="content">
          <FilterList />
          <Space height="2" />
        </List>
      </IonAccordion>
    </IonAccordionGroup>
  );
};
