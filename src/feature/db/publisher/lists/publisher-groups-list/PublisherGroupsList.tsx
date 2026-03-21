import {
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";

export function PublisherGroupsList() {
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
    <IonAccordionGroup multiple>
      {groups.map((group) => {
        const members = publishers?.filter((p) => p.group_id === group.id);
        const count = members?.length ?? 0;

        return (
          <IonAccordion key={group.id} value={group.id}>
            <Item slot="header">
              <IonLabel>{group.name}</IonLabel>
              <IonNote slot="end">{count}</IonNote>
            </Item>
            <List slot="content">
              {count > 0 ? (
                members!.map((member) => (
                  <Item key={member.id}>
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
            </List>
          </IonAccordion>
        );
      })}
    </IonAccordionGroup>
  );
}
