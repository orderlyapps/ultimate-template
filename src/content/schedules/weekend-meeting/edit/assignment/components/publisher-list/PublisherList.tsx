import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

interface PublisherListProps {
  publishers: Publisher[];
  onSelect?: (publisher: Publisher) => void;
}

export const PublisherList: React.FC<PublisherListProps> = ({
  publishers,
  onSelect,
}) => {
  if (publishers.length === 0) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No publishers found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {publishers.map((publisher) => (
        <Item
          key={publisher.id}
          button={!!onSelect}
          onClick={() => onSelect?.(publisher)}
        >
          <IonLabel>
            <Text>{formatPublisherName(publisher)}</Text>
          </IonLabel>
        </Item>
      ))}
    </List>
  );
};
