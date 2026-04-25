import { IonLabel, useIonAlert, useIonToast } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useCreatePublisherAuthUser } from "../use-create-publisher-auth-user/useCreatePublisherAuthUser";

/**
 * Lists publishers without an auth account. Tapping a publisher opens an
 * Ionic alert to confirm; on confirm, creates a passwordless auth user and
 * links it to the publisher via `publisher.auth_id`.
 */
export const PublisherSelectList: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { createAuthUser } = useCreatePublisherAuthUser();

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const eligible = publishers?.filter((p) => !p.auth_id) ?? [];

  const handleSelect = (publisherId: string, name: string) => {
    presentAlert({
      header: "Create auth user?",
      message: `This will create a passwordless account for ${name}.`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Create",
          handler: async () => {
            try {
              await createAuthUser(publisherId);
              presentToast({
                message: `Auth user created for ${name}`,
                duration: 2000,
                color: "success",
              });
            } catch (err) {
              presentToast({
                message: `Error: ${(err as Error).message}`,
                duration: 4000,
                color: "danger",
              });
            }
          },
        },
      ],
    });
  };

  if (!eligible.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers without an auth account.</Text>
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
          button
          onClick={() => handleSelect(p.id, formatPublisherName(p))}
        >
          <IonLabel>
            <Text>{formatPublisherName(p)}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
};
