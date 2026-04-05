import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import type { AssignmentItem } from "../../hooks/usePublisherAssignments";

type Props = {
  item: AssignmentItem;
};

/**
 * Renders a single assignment row matching the NotificationRow layout.
 * Title + details on the left, date label on the right.
 */
export function AssignmentRow({ item }: Props) {
  return (
    <Grid className="ion-no-padding ion-padding-horizontal">
      <Row>
        <Col>
          <Text bold size="sm">
            {item.title}
          </Text>
          {item.details.map((detail, i) => (
            <span key={i}>
              <br />
              <Text size="xs" color="medium">
                {detail}
              </Text>
            </span>
          ))}
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
