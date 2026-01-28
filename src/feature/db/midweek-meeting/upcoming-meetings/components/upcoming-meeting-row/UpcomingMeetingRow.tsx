import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IonItemDivider } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { useUpcomingMeetingsStore } from "../../state/useUpcomingMeetingsStore";

type Props = {
  weekId: string;
  index: number;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId, index }) => {
  const weeksToShow = useUpcomingMeetingsStore((s) => s.weeksToShow);
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

  const meeting = data?.[0];

  if (!meeting) {
    return null;
  }

  return (
    <List>
      <IonItemDivider sticky>
        <Grid>
          <Row>
            <Col>
              <Text color="primary" size="xl">
                {meeting?.mwb_week_date_locale}
              </Text>
              {index === 0 && <Text size="sm"> This Week</Text>}
              {index === 1 && <Text size="sm"> Next Week</Text>}
            </Col>
          </Row>
        </Grid>
      </IonItemDivider>

      <MeetingAgendaItems meeting={meeting} weekId={weekId} />

      {index === weeksToShow - 1 && weeksToShow < 9 && (
        <Button fill="clear" onClick={incrementWeeksToShow}>
          {weeksToShow === 1 ? "Show Next Week" : "Show More"}
        </Button>
      )}

      <Space height="5" />
    </List>
  );
};
