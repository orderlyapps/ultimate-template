import { IonIcon, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import addIcon from "@icons/add.svg";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import { DEFAULT_CONFIG } from "../../../../../../store/publisher-sort-filter.types";
import { FilterItem } from "./components/filter-item/FilterItem";

export const FilterList: React.FC = () => {
  const configByAssignment = usePublisherSortFilterStore((s) => s.configByAssignment);
  const currentAssignmentId = usePublisherSortFilterStore((s) => s.currentAssignmentId);
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);
  const activeConfig = currentAssignmentId
    ? configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG
    : DEFAULT_CONFIG;

  const handleAddFilter = () => {
    setActiveConfig({
      ...activeConfig,
      filters: [
        ...activeConfig.filters,
        { stat: "weeksSinceSameAssignment", minWeeks: 4 },
      ],
    });
  };

  return (
    <List>
      <Item lines="none">
        <IonLabel>
          <Text style={{ fontWeight: "bold" }}>Filters</Text>
        </IonLabel>
      </Item>
      {activeConfig.filters.map((filter, index) => (
        <FilterItem key={index} filter={filter} index={index} />
      ))}
      <Item button onClick={handleAddFilter}>
        <IonIcon src={addIcon} slot="start" color="primary" />
        <IonLabel>
          <Text color="primary">Add Filter</Text>
        </IonLabel>
      </Item>
    </List>
  );
};
