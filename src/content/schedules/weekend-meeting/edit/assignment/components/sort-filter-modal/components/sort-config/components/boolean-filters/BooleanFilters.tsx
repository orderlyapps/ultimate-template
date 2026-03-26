import { IonLabel, IonToggle } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import { DEFAULT_CONFIG } from "../../../../../../store/publisher-sort-filter.types";

export const BooleanFilters: React.FC = () => {
  const configByAssignment = usePublisherSortFilterStore((s) => s.configByAssignment);
  const currentAssignmentId = usePublisherSortFilterStore((s) => s.currentAssignmentId);
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);
  const activeConfig = currentAssignmentId
    ? configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG
    : DEFAULT_CONFIG;

  const handleHideWithAssignmentChange = (checked: boolean) => {
    setActiveConfig({ ...activeConfig, hideWithCurrentWeekAssignment: checked });
  };

  const handleHideNonParticipantsChange = (checked: boolean) => {
    setActiveConfig({ ...activeConfig, hideNonParticipants: checked });
  };

  return (
    <List>
      <Item lines="none">
        <IonLabel>
          <Text style={{ fontWeight: "bold" }}>Filters</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>Hide with assignment this week</IonLabel>
        <IonToggle
          slot="end"
          checked={activeConfig.hideWithCurrentWeekAssignment}
          onIonChange={(e) => handleHideWithAssignmentChange(e.detail.checked)}
        />
      </Item>
      <Item>
        <IonLabel>Hide non-participants</IonLabel>
        <IonToggle
          slot="end"
          checked={activeConfig.hideNonParticipants}
          onIonChange={(e) => handleHideNonParticipantsChange(e.detail.checked)}
        />
      </Item>
    </List>
  );
};
