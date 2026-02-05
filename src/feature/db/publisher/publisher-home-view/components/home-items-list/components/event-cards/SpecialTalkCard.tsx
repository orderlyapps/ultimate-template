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
    <Row >
      <Col>
        <Text color="primary" bold>Special Talk</Text>
        <Text size="sm"> - {formatEventDate(event.start_date)}</Text>
      </Col>
    </Row>
  );
};
