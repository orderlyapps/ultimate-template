import type { FC } from "react";
import type { Event } from "@tanstack-db/event/eventSchema";
import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

type Props = {
  event: Event;
};

export const OtherEventItem: FC<Props> = ({ event }) => {
  return (
    <Item>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label={event.name || "Other"} />
        {event.description ? (
          <>
            <br />
            <Text size="sm">{event.description}</Text>
          </>
        ) : null}
      </IonLabel>
    </Item>
  );
};
