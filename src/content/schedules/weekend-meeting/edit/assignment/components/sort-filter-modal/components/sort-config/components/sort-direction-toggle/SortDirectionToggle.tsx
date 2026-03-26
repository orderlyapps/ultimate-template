import { IonSegment, IonSegmentButton } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  type SortDirection,
} from "../../../../../../store/publisher-sort-filter.types";

export const SortDirectionToggle: React.FC = () => {
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

  const handleChange = (value: SortDirection) => {
    setActiveConfig({ ...activeConfig, sortDirection: value });
  };

  return (
    <Item lines="none">
      <IonSegment
        value={activeConfig.sortDirection}
        onIonChange={(e) => handleChange(e.detail.value as SortDirection)}
      >
        <IonSegmentButton value="asc">Ascending</IonSegmentButton>
        <IonSegmentButton value="desc">Descending</IonSegmentButton>
      </IonSegment>
    </Item>
  );
};
