import { IonLabel } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { usePermissionedGroups } from "@services/app/auth/permissions/usePermissionedGroups";

/**
 * Content component for the Group Reports page.
 * Displays only groups the user has permission to read or edit.
 */
export const GroupReportsContent: React.FC = () => {
  const { groups, isLoading } = usePermissionedGroups();

  if (isLoading) {
    return <Text>Loading groups...</Text>;
  }

  if (groups.length === 0) {
    return (
      <Text>You do not have permission to view any group reports.</Text>
    );
  }

  return (
    <List>
      {groups.sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
        <Item key={group.id} lines="full">
          <IonLabel>
            <Text bold>{group.name}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
};
