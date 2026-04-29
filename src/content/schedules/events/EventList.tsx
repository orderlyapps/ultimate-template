import type { FC } from "react";
import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { format } from "date-fns";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { groupEventsByMonth } from "./groupEventsByMonth";
import { EventMonthGroup } from "./components/event-month-group/EventMonthGroup";
import { Space } from "@layout/space/Space";

export const EventList: FC = () => {
  const [userCongregation] = useUserCongregation();
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const { data: events } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(
                eq(e.congregation_id, userCongregation.id),
                gte(e.start_date, todayStr),
              ),
            )
            .orderBy(({ e }) => e.start_date)
        : undefined,
    [userCongregation?.id, todayStr],
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

      <Space />
    </>
  );
};
