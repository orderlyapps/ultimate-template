import { Text } from "@ionic-display/text/Text";
import type { MonthGroup } from "../../useHomeItems";
import { WeekGroupCard } from "../week-group-card/WeekGroupCard";
import { EventCard } from "../event-cards/EventCard";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Space } from "@layout/space/Space";
import { Fragment } from "react";

type Props = {
  monthGroup: MonthGroup;
};

export const MonthGroupCard: React.FC<Props> = ({ monthGroup }) => {
  return (
    <>
      <Item className="ion-no-padding ion-text-center" lines="none">
        <IonLabel>
          <Text size="lg" bold color="primary">
            {monthGroup.monthLabel.toUpperCase()}
          </Text>
        </IonLabel>
      </Item>
      {monthGroup.weeks.map((week) => (
        <WeekGroupCard key={week.weekId} weekGroup={week} />
      ))}
      {monthGroup.events.map((event) => (
        <Fragment key={event.id}>
          <EventCard event={event} />
          <Space height="0.7" />
        </Fragment>
      ))}
    </>
  );
};
