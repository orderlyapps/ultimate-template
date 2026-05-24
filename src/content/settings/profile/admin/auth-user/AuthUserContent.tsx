import { IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { useParams } from "react-router-dom";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
import { Space } from "@layout/space/Space";
import { formatPublisherName } from "@format/formatPublisherName";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useGeneratePublisherOtp } from "../components/auth-user-list/components/use-generate-publisher-otp/useGeneratePublisherOtp";
import { usePublisherPhoneLookup } from "../components/auth-user-list/components/use-publisher-phone/usePublisherPhone";
import { OtpDisplayModal } from "../components/auth-user-list/components/otp-display-modal/OtpDisplayModal";
import { useAuthUserStore } from "./store/useAuthUserStore";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { CongregationAdminToggle } from "./components/congregation-admin-toggle/CongregationAdminToggle";
import { GroupPermissionsManager } from "./components/group-permissions-manager/GroupPermissionsManager";
import { CleanPermissionsManager } from "./components/clean-permissions-manager/CleanPermissionsManager";
import { SecretaryPermissionsManager } from "./components/secretary-permissions-manager/SecretaryPermissionsManager";
import { useUserPermissions } from "@services/app/auth/permissions/useUserPermissions";

/**
 * Displays auth user details for a specific publisher and provides
 * a button to generate a sign-in OTP. The OTP is displayed via
 * {@link OtpDisplayModal}, with a Send-via-SMS shortcut prefilled from
 * the local rxdb publisher record.
 */
export const AuthUserContent: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const { generate } = useGeneratePublisherOtp();
  const phoneLookupFor = usePublisherPhoneLookup();

  const { otp, smsPhone, isModalOpen, openModal, closeModal } =
    useAuthUserStore();

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisherId)),
  );

  const publisher = publishers?.[0];

  // Get current user's permissions to determine what controls to show
  const { isSuperAdmin, isCongregationAdmin } = useUserPermissions();
  const canManagePermissions = isSuperAdmin || isCongregationAdmin;

  const handleGenerate = async () => {
    if (!publisherId) return;
    const code = await generate({ publisherId, asAdmin: true });
    if (!code) return;
    const phone = phoneLookupFor(publisherId);
    openModal(code, phone);
  };

  if (!publisher) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>Publisher not found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      <List>
        <Item lines="none">
          <IonLabel>
            <SectionHeading>{formatPublisherName(publisher)}</SectionHeading>
          </IonLabel>
        </Item>
      </List>

      <Space height="2" />

      <Button onClick={handleGenerate}>Generate OTP</Button>

      {/* Permission management - only shown to admins */}
      {canManagePermissions && publisher.auth_id && (
        <>
          <Space height="4" />
          <List>
            <CongregationAdminToggle
              authUserId={publisher.auth_id}
              congregationId={publisher.congregation_id}
            />
            <GroupPermissionsManager
              authUserId={publisher.auth_id}
              congregationId={publisher.congregation_id}
            />
            <CleanPermissionsManager
              authUserId={publisher.auth_id}
              congregationId={publisher.congregation_id}
            />
            <SecretaryPermissionsManager
              authUserId={publisher.auth_id}
              congregationId={publisher.congregation_id}
            />
          </List>
        </>
      )}
      
      <Space />

      <OtpDisplayModal
        isOpen={isModalOpen}
        otp={otp}
        smsPhone={smsPhone}
        onDismiss={closeModal}
      />
    </>
  );
};
