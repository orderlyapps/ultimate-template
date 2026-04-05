import { Text } from "@ionic-display/text/Text";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  label: string;
};

/**
 * Renders a month group header label within the calendar list.
 */
export function CalendarMonthHeader({ label }: Props) {
  return (
    <Row>
      <Col className="ion-text-center ion-padding-top">
        <Text bold size="xs" color="medium">
          {label.toUpperCase()}
        </Text>
      </Col>
    </Row>
  );
}
