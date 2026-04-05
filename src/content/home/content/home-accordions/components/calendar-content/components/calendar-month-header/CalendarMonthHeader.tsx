import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
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
    <Grid className="ion-no-padding ion-padding-horizontal ion-padding-top ion-text-center">
      <Row>
        <Col>
          <Text bold size="xs" color="medium">
            {label.toUpperCase()}
          </Text>
        </Col>
      </Row>
    </Grid>
  );
}
