import type { FC } from "react";
import { IonListHeader } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import type { MonthGroup } from "../../groupEventsByMonth";
import { EventItem } from "../event-item/EventItem";
import { Text } from "@ionic-display/text/Text";

type Props = {
  group: MonthGroup;
};

export const EventMonthGroup: FC<Props> = ({ group }) => {
  return (
    <List>
      <IonListHeader>
        <Text size="xl" color="primary">
          {group.label.toUpperCase()}
        </Text>
      </IonListHeader>
      {group.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </List>
  );
};
