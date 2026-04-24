import { IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { authUserCollection } from "@tanstack-db/auth-user/authUserCollection";
import { useAuthStore } from "@services/app/auth/useAuthStore";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { PublisherList } from "./components/publisher-list/PublisherList";

/**
 * Admin content component for the Admin route page.
 * Only renders the publisher provisioning UI for super admins.
 */
export const AdminContent: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const { data: authUsers } = useLiveQuery(
    (q) => {
      if (!user?.id) return undefined;
      return q
        .from({ au: authUserCollection })
        .where(({ au }) => eq(au.auth_user_id, user.id));
    },
    [user?.id],
  );

  const isSuperAdmin = authUsers?.[0]?.is_super_admin ?? false;

  if (!isSuperAdmin) {
    return (
      <Item lines="none">
        <IonLabel>
          <Text color="medium">You do not have permission to view this page.</Text>
        </IonLabel>
      </Item>
    );
  }

  return <PublisherList />;
};
