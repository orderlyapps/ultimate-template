import { formatEventDate } from "@date/formatEventDate";
import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";

type Props = {
  event: Event;
};

export const ConventionCard: React.FC<Props> = ({ event }) => {
  return (
    <>
      <Row>
        <Col>
          <Text color="primary" bold>
            Regional Convention
          </Text>
        </Col>
        <Col className="ion-text-right">
          <Text size="xs">
            {formatEventDate(event.start_date, event.end_date)}
          </Text>
        </Col>
      </Row>
      <Row className="ion-padding-start">
        <Col>
          <Text size="sm">{event.name}</Text>
        </Col>
      </Row>
    </>
  );
};
