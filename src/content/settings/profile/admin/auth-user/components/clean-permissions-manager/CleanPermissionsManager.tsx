import { IonLabel, IonToggle } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useManageCleanPermissions } from "../use-manage-clean-permissions/useManageCleanPermissions";

interface CleanPermissionsManagerProps {
  /** The auth user ID to manage permissions for */
  authUserId: string | null;
  /** The congregation ID to filter */
  congregationId: string | null;
}

/**
 * Component for managing clean permissions.
 * Shows toggle for edit access to the congregation's cleaning tables.
 */
export const CleanPermissionsManager: React.FC<
  CleanPermissionsManagerProps
> = ({ authUserId, congregationId }) => {
  const { data: congregations } = useLiveQuery((q) =>
    q.from({ c: congregationCollection })
  );

  const { getCongregationPermission, setCongregationPermission } =
    useManageCleanPermissions(authUserId);

  // Filter to the specific congregation
  const congregation = congregations?.find((c) => c.id === congregationId);

  if (!congregation || !congregationId) {
    return null;
  }

  const permission = getCongregationPermission(congregationId);
  const canEdit = permission?.can_edit ?? false;

  const handleEditToggle = async (e: CustomEvent) => {
    const checked = e.detail.checked;
    await setCongregationPermission(congregationId, checked);
  };

  return (
    <>
      <Item lines="none">
        <IonLabel>
          <SectionHeading>Cleaning Schedules</SectionHeading>
        </IonLabel>
      </Item>

      <Item>
        <IonLabel>
          <Text>{congregation.name}</Text>
        </IonLabel>
        <div slot="end" className="ion-display-flex ion-align-items-center">
          <Text size="sm" className="ion-margin-end">
            Can Edit
          </Text>
          <IonToggle checked={canEdit} onIonChange={handleEditToggle} />
        </div>
      </Item>
    </>
  );
};
