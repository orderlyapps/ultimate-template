import type { FC } from "react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { groupEventsByMonth } from "./groupEventsByMonth";
import { EventMonthGroup } from "./components/event-month-group/EventMonthGroup";

export const EventList: FC = () => {
  const [userCongregation] = useUserCongregation();

  const { data: events } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) => eq(e.congregation_id, userCongregation.id))
            .orderBy(({ e }) => e.start_date)
        : undefined,
    [userCongregation?.id],
  );

  if (!events?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No events</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  const groups = groupEventsByMonth(events);

  return (
    <>
      {groups.map((group) => (
        <EventMonthGroup key={group.label} group={group} />
      ))}
    </>
  );
};
