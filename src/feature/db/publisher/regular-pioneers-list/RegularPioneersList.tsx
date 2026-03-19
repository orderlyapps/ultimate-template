import { IonLabel } from "@ionic/react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { Space } from "@layout/space/Space";

export function RegularPioneersList() {
  const isBeta = import.meta.env.VITE_IS_BETA;

  const { data: publishers } = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .where(({ p }) => eq(p.type, "regular_pioneer"))
      .orderBy(({ p }) => p.last_name),
  );

  if (!publishers?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No regular pioneers found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {publishers.map((publisher) => (
        <Item key={publisher.id} detail={isBeta}>
          <IonLabel>
            <Text>{formatPublisherName(publisher)}</Text>
          </IonLabel>
        </Item>
      ))}

      <Space />
    </List>
  );
}
