import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IonItemDivider } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { useUpcomingWeekendMeetingsStore } from "../../state/useUpcomingWeekendMeetingsStore";
import { IncomingTalk } from "./components/incoming-talk/IncomingTalk";
import { WeekendAssignments } from "./components/weekend-assignments/WeekendAssignments";
import { WeekendAVAssignments } from "./components/weekend-av-assignments/WeekendAVAssignments";
import { WeekendAttendantAssignments } from "./components/weekend-attendant-assignments/WeekendAttendantAssignments";
import { OutgoingSpeakers } from "./components/outgoing-speakers/OutgoingSpeakers";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";

type Props = {
  weekId: string;
  index: number;
};

export const UpcomingWeekendMeetingRow: FC<Props> = ({ weekId, index }) => {
  const weeksToShow = useUpcomingWeekendMeetingsStore((s) => s.weeksToShow);
  const incrementWeeksToShow = useUpcomingWeekendMeetingsStore(
    (s) => s.incrementWeeksToShow,
  );

  return (
    <List lines="none">
      <IonItemDivider sticky>
        <Grid>
          <Row>
            <Col size="auto">
              <Text color="primary" size="lg">
                {getTheocraticWeekLabel(weekId)}
              </Text>
            </Col>

            <Col className="ion-text-right">
              {index === 0 && <Text>This Week</Text>}
              {index === 1 && <Text>Next Week</Text>}
            </Col>
          </Row>
        </Grid>
      </IonItemDivider>

      <IncomingTalk weekId={weekId} />
      <WeekendAssignments weekId={weekId} />
      <WeekendAVAssignments weekId={weekId} />
      <WeekendAttendantAssignments weekId={weekId} />
      <OutgoingSpeakers weekId={weekId} />

      {index === weeksToShow - 1 && weeksToShow < 9 && (
        <Button fill="clear" onClick={incrementWeeksToShow}>
          {weeksToShow === 1 ? "Show Next Week" : "Show More"}
        </Button>
      )}

      <Space height="6" />
    </List>
  );
};
