import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import type { CalendarItem } from "../../hooks/useCalendarItems";

type Props = {
  item: CalendarItem;
};

/**
 * Renders a single calendar event row.
 * Title on the left, date label on the right.
 */
export function CalendarItemRow({ item }: Props) {
  return (
    <Grid className="ion-no-padding ion-padding-horizontal">
      <Row>
        <Col>
          <Text bold size="sm">
            {item.title}
          </Text>
        </Col>
        <Col className="ion-text-right">
          <Text size="xs" color="medium">
            {item.dateLabel}
          </Text>
        </Col>
      </Row>
    </Grid>
  );
}
