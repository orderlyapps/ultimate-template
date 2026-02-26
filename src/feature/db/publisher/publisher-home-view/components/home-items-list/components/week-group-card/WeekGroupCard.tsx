import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../useHomeItems";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { assignmentLabels } from "./assignmentLabels";
import { Space } from "@layout/space/Space";
import { Fragment } from "react";
import { PublicTalkInfo } from "./components/public-talk-info/PublicTalkInfo";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";

type Props = {
  weekGroup: WeekGroup;
};

export const WeekGroupCard: React.FC<Props> = ({ weekGroup }) => {
  return (
    <Grid className="ion-no-padding">
      {weekGroup.publicTalk && (
        <PublicTalkInfo publicTalk={weekGroup.publicTalk} />
      )}
      <Row>
        {weekGroup.midweekAssignments.length > 0 && (
          <Col>
            {weekGroup.midweekAssignments.map((assignment) => (
              <Fragment key={assignment.key}>
                <Row className="ion-align-items-end">
                  <Col>
                    <Text bold color="primary">
                      Midweek Assignment
                    </Text>
                  </Col>
                  <Col className="ion-text-right">
                    <Text size="xs">
                      {getTheocraticWeekLabel(weekGroup.weekId, {
                        format: "week-range-capital-case",
                        useRelativeWeek: true,
                      })}
                    </Text>
                  </Col>
                </Row>
                <Row className="ion-padding-start">
                  <Col>
                    <Text size="sm">
                      {assignment.title
                        ? assignmentLabels[assignment.title]
                        : ""}
                    </Text>
                  </Col>
                </Row>
              </Fragment>
            ))}
            <Space height="0.7" />
          </Col>
        )}
      </Row>
      <Row>
        {weekGroup.weekendAssignments.length > 0 && (
          <Col>
            {weekGroup.weekendAssignments.map((assignment) => (
              <Fragment key={assignment.key}>
                <Row className="ion-align-items-end">
                  <Col>
                    <Text bold color="primary">
                      Weekend Assignment
                    </Text>
                  </Col>
                  <Col className="ion-text-right">
                    <Text size="xs">
                      {getTheocraticWeekLabel(weekGroup.weekId, {
                        format: "week-range-capital-case",
                        useRelativeWeek: true,
                      })}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col className="ion-padding-start">
                    <Text size="sm">
                      {assignment.title
                        ? assignmentLabels[assignment.title]
                        : ""}
                    </Text>
                  </Col>
                </Row>
              </Fragment>
            ))}
            <Space height="0.7" />
          </Col>
        )}
      </Row>
    </Grid>
  );
};
