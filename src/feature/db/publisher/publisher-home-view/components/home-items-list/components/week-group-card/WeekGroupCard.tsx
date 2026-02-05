import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../useHomeItems";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { EventCard } from "../event-cards/EventCard";
import { assignmentLabels } from "./assignmentLabels";
import { Space } from "@layout/space/Space";
import { Fragment } from "react";

type Props = {
  weekGroup: WeekGroup;
};

export const WeekGroupCard: React.FC<Props> = ({ weekGroup }) => {
  return (
    <Grid className="ion-no-padding">
      <Row>
        <Col className="ion-text-center-xx">
          <Text>{getTheocraticWeekLabel(weekGroup.weekId)}</Text>
        </Col>
      </Row>
      {weekGroup.events.length > 0 && (
        <Row>
          <Col>
            {weekGroup.events.map((event) => (
              <Fragment key={event.id}>
                <EventCard event={event} />
                <Space height="0.2" />
              </Fragment>
            ))}
          </Col>
        </Row>
      )}
      <Row>
        {weekGroup.midweekAssignments.length > 0 && (
          <Col>
            {weekGroup.midweekAssignments.map((assignment) => (
              <Text key={assignment.key} bold color="primary">
                {assignment.title ? assignmentLabels[assignment.title] : ""}
              </Text>
            ))}
          </Col>
        )}
      </Row>
      <Row>
        {weekGroup.weekendAssignments.length > 0 && (
          <Col>
            {weekGroup.weekendAssignments.map((assignment) => (
              <Text key={assignment.key} bold color="primary">
                {assignment.title ? assignmentLabels[assignment.title] : ""}
              </Text>
            ))}
          </Col>
        )}
      </Row>
      <Space height="0.7" />
    </Grid>
  );
};
