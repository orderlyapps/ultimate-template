import { IonToggle } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { usePublisherSortFilterStore } from "../../../../../../store/usePublisherSortFilterStore";
import { DEFAULT_CONFIG } from "../../../../../../store/publisher-sort-filter.types";
import { Text } from "@ionic-display/text/Text";

export const BooleanFilters: React.FC = () => {
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

  const handleHideWithAssignmentChange = (checked: boolean) => {
    setActiveConfig({
      ...activeConfig,
      hideWithCurrentWeekAssignment: checked,
    });
  };

  const handleHideNonParticipantsChange = (checked: boolean) => {
    setActiveConfig({ ...activeConfig, hideNonParticipants: checked });
  };

  return (
    <List>
      <Item>
        <Text slot="start">Hide when assignment this week</Text>
        <IonToggle
          slot="end"
          checked={activeConfig.hideWithCurrentWeekAssignment}
          onIonChange={(e) => handleHideWithAssignmentChange(e.detail.checked)}
        />
      </Item>
      <Item>
        <Text slot="start">Hide Non-participants</Text>
        <IonToggle
          slot="end"
          checked={activeConfig.hideNonParticipants}
          onIonChange={(e) => handleHideNonParticipantsChange(e.detail.checked)}
        />
      </Item>
    </List>
  );
};
