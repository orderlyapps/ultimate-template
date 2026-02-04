import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";
import { format } from "date-fns";

type Props = {
  event: Event;
};

export const CircuitAssemblyCard: React.FC<Props> = ({ event }) => {
  return (
    <Grid>
      <Row>
        <Col>
          <Text size="md" bold>
            {format(new Date(event.start_date), "MMMM d (eeee)").toUpperCase()}
          </Text>
          <br />
          <Text>Circuit Assembly</Text>
          <br />
          <Text size="sm">{event.name}</Text>
          {event.address && <Text size="sm">{event.address}</Text>}
        </Col>
      </Row>
    </Grid>
  );
};
