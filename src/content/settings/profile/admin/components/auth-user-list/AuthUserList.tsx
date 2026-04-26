import { IonLabel } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

/**
 * Lists every publisher that already has an `auth_id`. Tapping a publisher
 * navigates to the auth-user detail page where the admin can generate an OTP.
 */
export const AuthUserList: React.FC = () => {
  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );
  const eligible = publishers?.filter((p) => p.auth_id) ?? [];

  if (!eligible.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers with auth users yet.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {eligible.map((p) => (
        <Item
          key={p.id}
          detail
          button
          routerLink={`/settings/profile/admin/auth-user/${p.id}`}
        >
          <IonLabel>
            <Text>{formatPublisherName(p)}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
};
