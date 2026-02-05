import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";

type Props = {
  event: Event;
};

export const CampaignCard: React.FC<Props> = ({ event }) => {
  return (
    <Grid className="ion-text-center">
      <Row>
        <Col>
          <Text bold>{event.name}</Text>
          <br />
          <Text size="sm">Starts on {formatEventDate(event.start_date)}</Text>
        </Col>
      </Row>
    </Grid>
  );
};
