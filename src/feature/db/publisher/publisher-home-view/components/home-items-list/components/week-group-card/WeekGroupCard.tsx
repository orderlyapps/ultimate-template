import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../useHomeItems";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  weekGroup: WeekGroup;
};

export const WeekGroupCard: React.FC<Props> = ({ weekGroup }) => {
  return (
    <Grid>
      <Row>
        <Col>
          <Text size="lg" bold color="primary">
            {getTheocraticWeekLabel(weekGroup.weekId)}
          </Text>
        </Col>
      </Row>
      <Row>
        {weekGroup.midweekAssignments.length > 0 && (
          <>
            <Col size="3">
              <Text size="sm" bold>
                Midweek
              </Text>
            </Col>
            <Col>
              {weekGroup.midweekAssignments.map((assignment) => (
                <div key={assignment.key}>
                  <Text size="sm">
                    {assignment.title ? `${assignment.title}` : ""}
                  </Text>
                </div>
              ))}
            </Col>
          </>
        )}
      </Row>
      <Row>
        {weekGroup.weekendAssignments.length > 0 && (
          <>
            <Col size="3">
              <Text size="sm" bold>
                Weekend
              </Text>
            </Col>
            <Col>
              {weekGroup.weekendAssignments.map((assignment) => (
                <div key={assignment.key}>
                  <Text size="sm">
                    {assignment.title ? `${assignment.title}` : ""}
                  </Text>
                </div>
              ))}
            </Col>
          </>
        )}
      </Row>
    </Grid>
  );
};
