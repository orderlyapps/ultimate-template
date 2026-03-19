import { IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { ItemOptionDelete } from "@input/sliding-item-option/ItemOptionDelete";
import { useHistory } from "react-router-dom";

export function GroupsList() {
  const history = useHistory();

  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name)
  );

  const handleDelete = (groupId: string) => {
    groupCollection.delete(groupId);
  };

  if (!groups?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No groups yet. Tap + to add one.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <List>
      {groups.map((group) => (
        <IonItemSliding key={group.id}>
          <Item
            onClick={() => history.push(`/home/groups/${group.id}`)}
            detail
          >
            <IonLabel>
              <Text size="lg">{group.name}</Text>
            </IonLabel>
          </Item>
          <IonItemOptions side="end">
            <ItemOptionDelete onClick={() => handleDelete(group.id)} />
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </List>
  );
}
