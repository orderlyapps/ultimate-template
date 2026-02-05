import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";

type Props = {
  event: Event;
};

export const ConventionCard: React.FC<Props> = ({ event }) => {
  return (
    <Row>
      <Col>
        <Text color="primary" bold>Regional Convention</Text>
        <br />
        <Text size="sm">{event.name}</Text>
      </Col>
    </Row>
  );
};
