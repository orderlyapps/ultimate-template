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
import { IonIcon } from "@ionic/react";
import assignmentIcon from "@icons/bookmark-filled.svg";

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
              </Fragment>
            ))}
          </Col>
        </Row>
      )}
      <Row>
        {weekGroup.midweekAssignments.length > 0 && (
          <Col>
            {weekGroup.midweekAssignments.map((assignment) => (
              <Row key={assignment.key} className="ion-align-items-end">
                <Col size="auto">
                  <IonIcon src={assignmentIcon} color="primary" />
                </Col>
                <Col>
                  <Text bold color="primary">
                    {assignment.title ? assignmentLabels[assignment.title] : ""}
                  </Text>
                  <Space height="0.2" />
                </Col>
              </Row>
            ))}
          </Col>
        )}
      </Row>
      <Row>
        {weekGroup.weekendAssignments.length > 0 && (
          <Col>
            {weekGroup.weekendAssignments.map((assignment) => (
              <Row key={assignment.key} className="ion-align-items-end">
                <Col size="auto">
                  <IonIcon src={assignmentIcon} color="primary" />
                </Col>
                <Col>
                  <Text bold color="primary">
                    {assignment.title ? assignmentLabels[assignment.title] : ""}
                  </Text>
                  <Space height="0.2" />
                </Col>
              </Row>
            ))}
          </Col>
        )}
      </Row>
      <Space height="0.7" />
    </Grid>
  );
};
