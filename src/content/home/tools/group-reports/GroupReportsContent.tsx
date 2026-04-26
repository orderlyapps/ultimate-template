import { IonAccordionGroup } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { usePermissionedGroups } from "@services/app/auth/permissions/usePermissionedGroups";
import { GroupPublisherAccordion } from "./components/group-publisher-accordion/GroupPublisherAccordion";

/** Returns the first day of the previous month as "yyyy-mm-dd" using local time */
const getPreviousMonthDate = (): string => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}-${String(month).padStart(2, "0")}-01`;
};

/**
 * Content component for the Group Reports page.
 * Displays permissioned groups as accordions, each listing their publishers.
 * Tapping a publisher navigates to their report form for the previous month.
 */
export const GroupReportsContent: React.FC = () => {
  const { groups, isLoading } = usePermissionedGroups();
  const reportDate = getPreviousMonthDate();

  if (isLoading) {
    return <Text>Loading groups...</Text>;
  }

  if (groups.length === 0) {
    return (
      <Text>You do not have permission to view any group reports.</Text>
    );
  }

  const sorted = [...groups].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <IonAccordionGroup multiple>
      {sorted.map((group) => (
        <GroupPublisherAccordion
          key={group.id}
          group={group}
          reportDate={reportDate}
        />
      ))}
    </IonAccordionGroup>
  );
};
