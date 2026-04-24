import { useState } from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { useAdminPublishers } from "./useAdminPublishers";
import { PublisherListItem } from "./components/publisher-list-item/PublisherListItem";

type FilterValue = "no-account" | "all";

/** Publisher list with a segment toggle between unprovisioned and all publishers. */
export const PublisherList: React.FC = () => {
  const [filter, setFilter] = useState<FilterValue>("no-account");
  const { publishers, publishersWithoutAuth } = useAdminPublishers();

  const displayed = filter === "no-account" ? publishersWithoutAuth : publishers;

  return (
    <>
      <Item lines="none">
        <IonSegment
          value={filter}
          onIonChange={(e) => setFilter(e.detail.value as FilterValue)}
        >
          <IonSegmentButton value="no-account">
            <IonLabel>No Account</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </Item>
      <List>
        {displayed.length === 0 && (
          <Item lines="none">
            <IonLabel>
              <Text color="medium">No publishers found.</Text>
            </IonLabel>
          </Item>
        )}
        {displayed.map((publisher) => (
          <PublisherListItem key={publisher.id} publisher={publisher} />
        ))}
      </List>
    </>
  );
};
