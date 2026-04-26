import { IonIcon, IonLabel } from "@ionic/react";
import { listOutline } from "ionicons/icons";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";
import { usePublisherListsStore } from "@/content/publishers/lists/store/usePublisherListsStore";
import { useFilteredPublishers } from "./useFilteredPublishers";

export function PublishersList() {
  const { setIsPresetModalOpen } = usePublisherListsStore();

  const { publishers, filteredPublishers } = useFilteredPublishers();

  if (!publishers?.length) {
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

  const count = filteredPublishers?.length ?? 0;

  return (
    <>
      <Button fill="clear" onClick={() => setIsPresetModalOpen(true)}>
        <IonIcon icon={listOutline} slot="start" />
        Lists
      </Button>
      <Item>
        <Text color="medium" size="sm">
          {count} {count === 1 ? "record" : "records"} found
        </Text>
      </Item>
      <List>
        {filteredPublishers?.map((publisher) => (
          <Item
            key={publisher.id}
            routerLink={`/publishers/all/${publisher.id}`}
          >
            <IonLabel>
              <Text>{formatPublisherName(publisher)}</Text>
            </IonLabel>
          </Item>
        ))}
        {filteredPublishers?.length === 0 && (
          <Item lines="none">
            <IonLabel>
              <Text>No publishers match the current filters.</Text>
            </IonLabel>
          </Item>
        )}
        <Space />
      </List>
    </>
  );
}
