import { useState } from "react";
import {
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent
} from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  FILTERABLE_STATS,
  STAT_LABELS,
  type FilterConfig,
} from "../../../../../../store/publisher-sort-filter.types";
import { FilterItem } from "./components/filter-item/FilterItem";

export const FilterList: React.FC = () => {
  const [showFilterSelect, setShowFilterSelect] = useState(false);
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);
  const activeConfig = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG)
    : DEFAULT_CONFIG;

  const usedStats = new Set(activeConfig.filters.map((f) => f.stat));
  const availableStats = FILTERABLE_STATS.filter(
    (stat) => !usedStats.has(stat),
  );

  const handleAddFilter = (stat: FilterConfig["stat"]) => {
    setActiveConfig({
      ...activeConfig,
      filters: [...activeConfig.filters, { stat, minWeeks: 4 }],
    });
    setShowFilterSelect(false);
  };

  return (
    <>
      <List>
        {activeConfig.filters.map((filter, index) => (
          <FilterItem key={index} filter={filter} index={index} />
        ))}
        <Item onClick={() => setShowFilterSelect(true)}>
          <Text slot="end" size="sm" bold color="primary">
            + Add Filter
          </Text>
        </Item>
      </List>

      <IonModal
        isOpen={showFilterSelect}
        onDidDismiss={() => setShowFilterSelect(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Filter</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowFilterSelect(false)}>
                Cancel
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List>
            {availableStats.map((stat) => (
              <Item key={stat} onClick={() => handleAddFilter(stat)}>
                <IonLabel>{STAT_LABELS[stat]}</IonLabel>
              </Item>
            ))}
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
