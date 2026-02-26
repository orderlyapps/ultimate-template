import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";

export const CircuitVisitCard: React.FC<{ week_id: string }> = ({
  week_id,
}) => {
  return (
    <Row>
      <Col>
        <Text bold color="primary">
          Circuit Overseer Visit
        </Text>
      </Col>
      <Col className="ion-text-right">
        <Text size="xs">
          {getTheocraticWeekLabel(week_id, {
            format: "week-range-capital-case",
          })}
        </Text>
      </Col>
    </Row>
  );
};
