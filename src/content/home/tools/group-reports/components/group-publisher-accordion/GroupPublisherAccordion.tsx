import { IonAccordion, IonLabel, IonNote } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { usePublishersByGroup } from "../../hooks/usePublishersByGroup";
import type { Group } from "@tanstack-db/group/groupSchema";

type Props = {
  /** The group whose publishers to display */
  group: Group;
  /** First day of previous month as "yyyy-mm-dd" */
  reportDate: string;
};

/**
 * Accordion item for a single group showing its publishers as tappable report entries.
 */
export const GroupPublisherAccordion: React.FC<Props> = ({
  group,
  reportDate,
}) => {
  const { data: publishers } = usePublishersByGroup(group.id);
  const count = publishers?.length ?? 0;

  return (
    <IonAccordion value={group.id}>
      <Item slot="header">
        <IonLabel>{group.name}</IonLabel>
        <IonNote slot="end">{count}</IonNote>
      </Item>
      <List slot="content">
        {count === 0 ? (
          <Item lines="none">
            <IonLabel>
              <Text color="medium">No publishers in this group</Text>
            </IonLabel>
          </Item>
        ) : (
          publishers!.map((publisher) => (
            <Item
              key={publisher.id}
              detail
              button
              routerLink={`/home/group-reports/${publisher.id}?date=${reportDate}`}
            >
              <IonLabel>
                <Text>{formatPublisherName(publisher)}</Text>
              </IonLabel>
            </Item>
          ))
        )}
      </List>
    </IonAccordion>
  );
};
