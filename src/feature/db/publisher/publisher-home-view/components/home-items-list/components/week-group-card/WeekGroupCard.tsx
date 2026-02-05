import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../useHomeItems";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { EventCard } from "../event-cards/EventCard";
import { assignmentLabels } from "./assignmentLabels";

type Props = {
  weekGroup: WeekGroup;
};

export const WeekGroupCard: React.FC<Props> = ({ weekGroup }) => {
  return (
    <Grid className="ion-no-padding">
      <Row>
        <Col>
          <Text size="lg">{getTheocraticWeekLabel(weekGroup.weekId)}</Text>
        </Col>
      </Row>
      {weekGroup.events.length > 0 && (
        <Row>
          <Col>
            {weekGroup.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Col>
        </Row>
      )}
      <Row>
        {weekGroup.midweekAssignments.length > 0 && (
          <Col className="ion-text-center">
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
          <Col className="ion-text-center">
            {weekGroup.weekendAssignments.map((assignment) => (
              <Text key={assignment.key} bold color="primary">
                {assignment.title ? assignmentLabels[assignment.title] : ""}
              </Text>
            ))}
          </Col>
        )}
      </Row>
    </Grid>
  );
};
