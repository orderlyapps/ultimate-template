import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";

type Props = {
  event: Event;
};

export const OtherEventCard: React.FC<Props> = ({ event }) => {
  return (
    <Row>
      <Col>
        <Text color="primary" bold>{event.name}</Text>
        <Text size="sm"> - {formatEventDate(event.start_date)}</Text>
      </Col>
    </Row>
  );
};
