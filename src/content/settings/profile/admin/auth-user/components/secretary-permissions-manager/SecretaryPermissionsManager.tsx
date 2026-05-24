import { IonLabel, IonToggle } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useManageSecretaryPermissions } from "../use-manage-secretary-permissions/useManageSecretaryPermissions";

interface SecretaryPermissionsManagerProps {
  /** The auth user ID to manage permissions for */
  authUserId: string | null;
  /** The congregation ID to filter */
  congregationId: string | null;
}

/**
 * Component for managing secretary permissions.
 * Shows a toggle to grant or revoke the secretary permission for the congregation.
 */
export const SecretaryPermissionsManager: React.FC<
  SecretaryPermissionsManagerProps
> = ({ authUserId, congregationId }) => {
  const { data: congregations } = useLiveQuery((q) =>
    q.from({ c: congregationCollection })
  );

  const { getCongregationPermission, setCongregationPermission } =
    useManageSecretaryPermissions(authUserId);

  const congregation = congregations?.find((c) => c.id === congregationId);

  if (!congregation || !congregationId) {
    return null;
  }

  const hasPermission = !!getCongregationPermission(congregationId);

  const handleToggle = async (e: CustomEvent) => {
    const checked = e.detail.checked;
    await setCongregationPermission(congregationId, checked);
  };

  return (
    <>
      <Item lines="none">
        <IonLabel>
          <SectionHeading>Secretary</SectionHeading>
        </IonLabel>
      </Item>

      <Item>
        <IonLabel>
          <Text>{congregation.name}</Text>
        </IonLabel>
        <div slot="end" className="ion-display-flex ion-align-items-center">
          <Text size="sm" className="ion-margin-end">
            Secretary
          </Text>
          <IonToggle checked={hasPermission} onIonChange={handleToggle} />
        </div>
      </Item>
    </>
  );
};
