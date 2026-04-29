import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import type { MonthGroup } from "../../groupEventsByMonth";
import { EventItem } from "../event-item/EventItem";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Space } from "@layout/space/Space";

type Props = {
  group: MonthGroup;
};

export const EventMonthGroup: FC<Props> = ({ group }) => {
  return (
    <List>
      <Item>
        <IonLabel className="ion-margin">
          <Text size="xl" color="primary">
            {group.label.toUpperCase()}
          </Text>
        </IonLabel>
      </Item>
      {group.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Space height="2" />
    </List>
  );
};
