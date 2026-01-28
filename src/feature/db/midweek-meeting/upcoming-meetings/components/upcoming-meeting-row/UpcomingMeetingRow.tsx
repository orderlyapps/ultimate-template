import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IonItemDivider } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  weekId: string;
  index: number;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId, index }) => {
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
            </Col>
          </Row>
          
          {index === 0 && (
            <Row>
              <Col>
                <Text size="lg">This Week</Text>
              </Col>
            </Row>
          )}

          {index === 1 && (
            <Row>
              <Col>
                <Text size="lg">Next Week</Text>
              </Col>
            </Row>
          )}
        </Grid>
      </IonItemDivider>

      <MeetingAgendaItems meeting={meeting} weekId={weekId} />

      <Space height="3" />
    </List>
  );
};
