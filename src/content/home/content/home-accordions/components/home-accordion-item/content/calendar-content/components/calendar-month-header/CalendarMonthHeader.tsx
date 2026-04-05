import { Text } from "@ionic-display/text/Text";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";

type Props = {
  label: string;
};

/**
 * Renders a month group header label within the calendar list.
 */
export function CalendarMonthHeader({ label }: Props) {
  return (
    <Grid className="ion-no-padding ion-no-margin ion-margin-top">
      <Row>
        <Col className="ion-text-center">
          <Text bold size="xs" color="medium">
            {label.toUpperCase()}
          </Text>
        </Col>
      </Row>
    </Grid>
  );
}
