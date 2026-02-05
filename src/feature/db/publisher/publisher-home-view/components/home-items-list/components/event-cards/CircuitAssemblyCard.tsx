import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";

type Props = {
  event: Event;
};

export const CircuitAssemblyCard: React.FC<Props> = ({ event }) => {
  return (
    <Row>
      <Col>
        <Text bold color="primary">Circuit Assembly</Text>
        <Text size="sm"> - {formatEventDate(event.start_date)}</Text>
        <br />
        <Text size="sm">{event.name}</Text>
        {event.address && <Text size="sm">{event.address}</Text>}
      </Col>
    </Row>
  );
};
