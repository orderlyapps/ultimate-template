import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { Toggle } from "@ionic-input/toggle/Toggle";
import { isNull, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { formatPublisherName } from "@format/formatPublisherName";
import { useState } from "react";
import { useAddMemberFilterStore } from "./store/useAddMemberFilterStore";

type Props = {
  groupId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddMemberModal({ groupId, isOpen, onDismiss }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const showUnassignedOnly = useAddMemberFilterStore((s) => s.showUnassignedOnly);
  const toggleShowUnassignedOnly = useAddMemberFilterStore((s) => s.toggleShowUnassignedOnly);

  const { data: unassignedPublishers } = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .where(({ p }) => isNull(p.group_id))
      .orderBy(({ p }) => p.last_name)
  );

  const { data: allPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name)
  );

  const publishers = showUnassignedOnly ? unassignedPublishers : allPublishers;

  const filteredPublishers = publishers?.filter((p) =>
    formatPublisherName(p).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = (publisherId: string) => {
    publisherCollection.update(publisherId, (draft) => {
      draft.group_id = groupId;
    });
    onDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Member</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search publishers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <Item>
            <IonLabel>Show unassigned only</IonLabel>
            <Toggle
              checked={showUnassignedOnly}
              onIonChange={toggleShowUnassignedOnly}
            />
          </Item>
        </List>
        <List>
          {filteredPublishers?.length === 0 && (
            <Item lines="none">
              <IonLabel>
                <Text color="medium">No publishers found</Text>
              </IonLabel>
            </Item>
          )}
          {filteredPublishers?.map((publisher) => (
            <Item
              key={publisher.id}
              onClick={() => handleAddMember(publisher.id)}
              button
            >
              <IonLabel>
                <Text>{formatPublisherName(publisher)}</Text>
                {publisher.group_id && (
                  <Text color="medium" size="sm">
                    Already assigned
                  </Text>
                )}
              </IonLabel>
            </Item>
          ))}
        </List>
      </IonContent>
    </IonModal>
  );
}
