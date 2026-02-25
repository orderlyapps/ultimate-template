import { Text } from "@ionic-display/text/Text";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

type Props = {
  event: Event;
};

export const SpecialTalkCard: React.FC<Props> = ({ event }) => {
  return (
    <Row>
      <Col>
        <Text color="primary" bold>
          Special Talk
        </Text>
      </Col>
      <Col className="ion-text-right">
        <Text size="xs">
          {" "}
          {formatEventDate(event.start_date, event.end_date)}
        </Text>
      </Col>
    </Row>
  );
};
