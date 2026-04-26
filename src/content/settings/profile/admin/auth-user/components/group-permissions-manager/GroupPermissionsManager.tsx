import { IonLabel, IonToggle } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { useManageReportPermissions } from "../use-manage-report-permissions/useManageReportPermissions";

interface GroupPermissionsManagerProps {
  /** The auth user ID to manage permissions for */
  authUserId: string | null;
  /** The congregation ID to filter groups */
  congregationId: string | null;
}

/**
 * Component for managing group report permissions.
 * Shows all groups in the congregation with toggles for read/edit access.
 */
export const GroupPermissionsManager: React.FC<
  GroupPermissionsManagerProps
> = ({ authUserId, congregationId }) => {
  const { data: groups } = useLiveQuery((q) => q.from({ g: groupCollection }));

  const { getGroupPermission, setGroupPermission } =
    useManageReportPermissions(authUserId);

  // Filter groups by congregation
  const congregationGroups =
    groups?.filter((g) => g.congregation_id === congregationId) ?? [];

  if (congregationGroups.length === 0) {
    return null;
  }

  return (
    <>
      <Item lines="none">
        <IonLabel>
          <SectionHeading>Group Reports</SectionHeading>
        </IonLabel>
      </Item>

      {congregationGroups.sort((a, b) => a.name.localeCompare(b.name)).map((group) => {
        const permission = getGroupPermission(group.id);
        const canRead = permission?.can_read ?? false;
        const canEdit = permission?.can_edit ?? false;

        const handleReadToggle = async (e: CustomEvent) => {
          const checked = e.detail.checked;
          await setGroupPermission(group.id, checked, canEdit);
        };

        const handleEditToggle = async (e: CustomEvent) => {
          const checked = e.detail.checked;
          await setGroupPermission(group.id, canRead, checked);
        };

        return (
          <Item key={group.id}>
            <IonLabel>
              <Text>{group.name}</Text>
            </IonLabel>
            <div slot="end" className="ion-display-flex ion-align-items-center">
              <Text size="sm" className="ion-margin-end">
                Read
              </Text>
              <IonToggle
                checked={canRead}
                onIonChange={handleReadToggle}
                className="ion-margin-end"
              />
              <Text size="sm" className="ion-margin-end">
                Edit
              </Text>
              <IonToggle checked={canEdit} onIonChange={handleEditToggle} />
            </div>
          </Item>
        );
      })}
    </>
  );
};
