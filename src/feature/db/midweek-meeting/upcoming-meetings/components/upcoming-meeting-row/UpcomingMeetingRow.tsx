import { and, eq, gte, lt, or, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IonItemDivider, IonLabel, IonNote } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { useUpcomingMeetingsStore } from "../../state/useUpcomingMeetingsStore";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { addDays, format } from "date-fns";
import { Item } from "@ionic-layout/item/Item";

type Props = {
  weekId: string;
  index: number;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId, index }) => {
  const weeksToShow = useUpcomingMeetingsStore((s) => s.weeksToShow);

  const lastDayOfWeek = format(addDays(weekId, 7), "yyyy-MM-dd");

  const incrementWeeksToShow = useUpcomingMeetingsStore(
    (s) => s.incrementWeeksToShow,
  );

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

  console.log(lastDayOfWeek, events);

  const circuit_assembly = events.find((e) => e.type === "circuit_assembly");

  const meeting = data?.[0];

  if (!meeting) {
    return null;
  }

  return (
    <List>
      <IonItemDivider sticky className="ion-padding-bottom">
        <Grid>
          <Row>
            <Col size="auto">
              <Text color="primary" size="lg">
                {meeting?.mwb_week_date_locale}
              </Text>
            </Col>
            <Col className="ion-text-right">
              {index === 0 && <Text> This Week</Text>}
              {index === 1 && <Text> Next Week</Text>}
            </Col>
          </Row>
        </Grid>
      </IonItemDivider>

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

      {index === weeksToShow - 1 && weeksToShow < 9 && (
        <Button fill="clear" onClick={incrementWeeksToShow}>
          {weeksToShow === 1 ? "Show Next Week" : "Show More"}
        </Button>
      )}

      <Space height="5" />
    </List>
  );
};
