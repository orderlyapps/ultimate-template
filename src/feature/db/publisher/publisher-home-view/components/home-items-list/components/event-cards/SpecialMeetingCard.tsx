import { Text } from "@ionic-display/text/Text";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";
import { Row } from "@ionic-layout/row/Row";

type Props = {
  event: Event;
};

export const SpecialMeetingCard: React.FC<Props> = ({ event }) => (
  <Row>
    <Text color="primary" bold>Special Meeting</Text>
    <Text size="sm"> - {formatEventDate(event.start_date, event.end_date)}</Text>
  </Row>
);
