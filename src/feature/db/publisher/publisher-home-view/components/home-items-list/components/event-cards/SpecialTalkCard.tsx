import { Text } from "@ionic-display/text/Text";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  event: Event;
};

export const SpecialTalkCard: React.FC<Props> = ({ event }) => {
  return (
    <Grid className="ion-text-center">
      <Row>
        <Col>
          <Text bold>Special Talk</Text>
          <br />
          <Text size="sm">{formatEventDate(event.start_date)}</Text>
        </Col>
      </Row>
    </Grid>
  );
};
