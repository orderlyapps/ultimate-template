import { IonLabel, IonToggle } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useManageCongregationAdmin } from "../use-manage-congregation-admin/useManageCongregationAdmin";
import { useIsSuperAdmin } from "../../../components/use-is-super-admin/useIsSuperAdmin";

interface CongregationAdminToggleProps {
  /** The auth user ID to manage */
  authUserId: string | null;
  /** The congregation ID */
  congregationId: string | null;
}

/**
 * Toggle component for managing congregation admin status.
 * Only visible to super admins.
 */
export const CongregationAdminToggle: React.FC<
  CongregationAdminToggleProps
> = ({ authUserId, congregationId }) => {
  const isSuperAdmin = useIsSuperAdmin();
  const { isCongregationAdmin, addCongregationAdmin, removeCongregationAdmin } =
    useManageCongregationAdmin(authUserId, congregationId);

  // Only super admins can see this toggle
  if (!isSuperAdmin) {
    return null;
  }

  const handleToggle = async (e: CustomEvent) => {
    const checked = e.detail.checked;
    if (checked) {
      await addCongregationAdmin();
    } else {
      await removeCongregationAdmin();
    }
  };

  return (
    <Item>
      <IonLabel>
        <Text>Admin</Text>
      </IonLabel>
      <IonToggle
        slot="end"
        checked={isCongregationAdmin}
        onIonChange={handleToggle}
      />
    </Item>
  );
};
