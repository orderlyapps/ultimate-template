import { IonIcon, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { standingOptions } from "@tanstack-db/publisher/standingSchema";
import { typeOptions } from "@tanstack-db/publisher/typeSchema";
import { useParams } from "react-router-dom";
import sisterIcon from "@icons/sister.svg";
import brotherIcon from "@icons/brother.svg";

export function PublisherDetailView() {
  const { publisherId } = useParams<{ publisherId: string }>();

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisherId)),
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

  return (
    <List>
      <Item>
        <IonIcon
          slot="start"
          color="primary"
          src={publisher.gender === "male" ? brotherIcon : sisterIcon}
          size="large"
        />
        <Text>
          {formatPublisherName(publisher, "first (display) middle last")}
        </Text>
      </Item>
      {(publisher.standing === "unbaptised_publisher" ||
        publisher.standing === "elder" ||
        publisher.standing === "ministerial_servant") && (
        <Item>
          <IonLabel>
            <Text color="medium">Standing</Text>
          </IonLabel>
          <Text>{standingLabel}</Text>
        </Item>
      )}
      {(publisher.type === "regular_pioneer" ||
        publisher.type === "continuous_auxilary") && (
        <Item>
          <IonLabel>
            <Text color="medium">Type</Text>
          </IonLabel>
          <Text>{typeLabel}</Text>
        </Item>
      )}
    </List>
  );
}
