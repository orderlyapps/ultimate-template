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
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Space } from "@layout/space/Space";

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
    <>
      <IonAccordionGroup multiple>
        {groups.map((group) => {
          const members = publishers?.filter((p) => p.group_id === group.id);
          const count = members?.length ?? 0;

          return (
            <IonAccordion key={group.id} value={group.id}>
              <ItemAccordionHeader>
                <IonLabel className="ion-margin-vertical">
                  <SectionHeading>{group.name}</SectionHeading>
                </IonLabel>
                <IonNote slot="end" className="ion-padding-end">
                  {count}
                </IonNote>
              </ItemAccordionHeader>
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
                <Space />
              </List>
            </IonAccordion>
          );
        })}
      </IonAccordionGroup>
      <Space />
    </>
  );
}
