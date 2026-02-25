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
    <>
      <Row>
        <Col>
          <Text bold color="primary">
            Circuit Assembly
          </Text>
        </Col>
        <Col className="ion-text-right">
          <Text size="xs">
            {" "}
            {formatEventDate(event.start_date, event.end_date)}
          </Text>
        </Col>
      </Row>
      <Row className="ion-padding-start">
        <Col>
          <Text size="sm">{event.name}</Text>
          {event.address && <Text size="sm">{event.address}</Text>}
        </Col>
      </Row>
    </>
  );
};
