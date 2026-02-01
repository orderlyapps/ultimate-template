import { and, eq, gte, lt, or, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IonLabel, IonNote } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { addDays, format } from "date-fns";
import { Item } from "@ionic-layout/item/Item";

type Props = {
  weekId: string;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId }) => {
  const lastDayOfWeek = format(addDays(weekId, 7), "yyyy-MM-dd");

  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: midweekMeetingDataCollection,
      })
      .where(({ m }) => eq(m.week_id, weekId)),
  );

  const { data: events } = useLiveQuery((q) =>
    q
      .from({
        e: eventCollection,
      })
      .where(({ e }) =>
        or(
          and(gte(e.start_date, weekId), lt(e.start_date, lastDayOfWeek)),
          and(gte(e.end_date, weekId), lt(e.end_date, lastDayOfWeek)),
        ),
      ),
  );

  const circuit_assembly = events.find((e) => e.type === "circuit_assembly");

  const meeting = data?.[0];

  if (!meeting) {
    return null;
  }

  return (
    <List>
      {circuit_assembly ? (
        <List>
          <Item className="ion-text-center-xx">
            <IonLabel>
              <Text bold size="xl">
                Circuit Assembly
              </Text>
              <Text> ({format(circuit_assembly.start_date, "EEEE")})</Text>
              <br />
              <IonNote>{circuit_assembly.name}</IonNote>
            </IonLabel>
          </Item>
        </List>
      ) : (
        <MeetingAgendaItems meeting={meeting} weekId={weekId} />
      )}
    </List>
  );
};
