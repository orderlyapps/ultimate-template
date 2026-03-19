import { IonLabel, IonListHeader } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { useHistory } from "react-router-dom";
import { Space } from "@layout/space/Space";

export function PublisherGroupsList() {
  const history = useHistory();
  const isBeta = import.meta.env.VITE_IS_BETA;

  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).orderBy(({ g }) => g.name),
  );

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  if (!groups?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No groups found.</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  return (
    <>
      {groups.map((group) => {
        const members = publishers?.filter((p) => p.group_id === group.id);

        return (
          <List key={group.id}>
            <IonListHeader>
              <IonLabel>{group.name}</IonLabel>
            </IonListHeader>
            {members?.length ? (
              members.map((member) => (
                <Item
                  key={member.id}
                  detail={isBeta}
                  onClick={
                    isBeta
                      ? () => history.push(`/home/groups/${group.id}`)
                      : undefined
                  }
                >
                  <IonLabel>
                    <Text>{formatPublisherName(member)}</Text>
                  </IonLabel>
                </Item>
              ))
            ) : (
              <Item lines="none">
                <IonLabel>
                  <Text>No members</Text>
                </IonLabel>
              </Item>
            )}

            <Space />
          </List>
        );
      })}
    </>
  );
}
