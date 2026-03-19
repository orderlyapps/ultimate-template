import { IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { standingOptions } from "@tanstack-db/publisher/standingSchema";
import { typeOptions } from "@tanstack-db/publisher/typeSchema";
import { genderOptions } from "@tanstack-db/publisher/genderSchema";

interface PublisherDetailViewProps {
  publisherId: string;
}

export function PublisherDetailView({ publisherId }: PublisherDetailViewProps) {
  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisherId))
  );

  const publisher = publishers?.[0];

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

  const standingLabel =
    standingOptions.find((opt) => opt.value === publisher.standing)?.label ??
    publisher.standing;

  const typeLabel =
    typeOptions.find((opt) => opt.id === publisher.type)?.label ??
    publisher.type;

  const genderLabel =
    genderOptions.find((opt) => opt.id === publisher.gender)?.label ??
    publisher.gender;

  return (
    <List>
      <Item>
        <IonLabel>
          <Text color="medium">Name</Text>
          <Text>{formatPublisherName(publisher, "first (display) middle last")}</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text color="medium">Standing</Text>
          <Text>{standingLabel}</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text color="medium">Type</Text>
          <Text>{typeLabel}</Text>
        </IonLabel>
      </Item>
      <Item>
        <IonLabel>
          <Text color="medium">Gender</Text>
          <Text>{genderLabel}</Text>
        </IonLabel>
      </Item>
    </List>
  );
}
