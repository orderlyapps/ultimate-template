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
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { Group } from "@tanstack-db/group/groupSchema";

type Props = {
  member: Publisher | null;
  groups: Group[];
  currentGroupId: string;
  onDismiss: () => void;
};

export function MemberActionsModal({
  member,
  groups,
  currentGroupId,
  onDismiss,
}: Props) {
  const handleRemoveFromGroup = () => {
    if (!member) return;
    publisherCollection.update(member.id, (draft) => {
      draft.group_id = null;
    });
    onDismiss();
  };

  const handleMoveToGroup = (groupId: string) => {
    if (!member) return;
    publisherCollection.update(member.id, (draft) => {
      draft.group_id = groupId;
    });
    onDismiss();
  };

  const otherGroups = groups.filter((g) => g.id !== currentGroupId);

  return (
    <IonModal isOpen={!!member} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{member ? formatPublisherName(member) : "Member"}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <Item onClick={handleRemoveFromGroup} button>
            <IonLabel color="danger">
              <Text>Remove from Group</Text>
            </IonLabel>
          </Item>
        </List>
        {otherGroups.length > 0 && (
          <List>
            <Item lines="none">
              <IonLabel>
                <Text color="medium">Move to Group</Text>
              </IonLabel>
            </Item>
            {otherGroups.map((group) => (
              <Item key={group.id} onClick={() => handleMoveToGroup(group.id)} button>
                <IonLabel>
                  <Text>{group.name}</Text>
                </IonLabel>
              </Item>
            ))}
          </List>
        )}
      </IonContent>
    </IonModal>
  );
}
