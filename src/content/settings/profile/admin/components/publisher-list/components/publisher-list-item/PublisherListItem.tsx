import { IonLabel, IonNote } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { PublisherItemAction } from "./components/publisher-item-action/PublisherItemAction";

type Props = {
  publisher: Publisher;
};

/** Renders a single publisher row with create-account or send-OTP actions. */
export const PublisherListItem: React.FC<Props> = ({ publisher }) => {
  const hasAccount = !!publisher.auth_id;

  return (
    <Item>
      <IonLabel>
        <Text>{formatPublisherName(publisher)}</Text>
        {hasAccount && <IonNote color="medium">Account active</IonNote>}
      </IonLabel>
      <PublisherItemAction publisher={publisher} />
    </Item>
  );
};
