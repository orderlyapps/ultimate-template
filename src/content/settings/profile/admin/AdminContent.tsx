import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { useIsSuperAdmin } from "./components/use-is-super-admin/useIsSuperAdmin";
import { PublisherSelectList } from "./components/publisher-select-list/PublisherSelectList";
import { AuthUserList } from "./components/auth-user-list/AuthUserList";

/**
 * Admin page content. Currently lets a super admin pick a publisher and
 * provision a passwordless auth.users account for them. Permission is
 * gated on `auth_user.is_super_admin`; later this will be expanded with a
 * dedicated `permission` table for non-super admins.
 */
export const AdminContent: React.FC = () => {
  const isSuperAdmin = useIsSuperAdmin();

  if (!isSuperAdmin) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>You do not have permission to access admin tools.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      <Space height="2" />
      <Item lines="none">
        <IonLabel>
          <Text size="lg">Create auth user for publisher</Text>
        </IonLabel>
      </Item>
      <PublisherSelectList />
      <Space height="3" />
      <Item lines="none">
        <IonLabel>
          <Text size="lg">Generate sign-in code</Text>
        </IonLabel>
      </Item>
      <AuthUserList />
      <Space />
    </>
  );
};
