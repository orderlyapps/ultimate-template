import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";

type Props = {
  event: Event;
};

export const MemorialCard: React.FC<Props> = ({ event }) => {
  return (
    <Row>
      <Col>
        <Text bold color="primary">Memorial</Text>
        <Text size="sm">
          {" "}
          -{" "}
          {event.start_time && (
            <>
              {new Date(
                `${event.start_date}T${event.start_time}`,
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
            </>
          )}
          {formatEventDate(event.start_date, event.end_date)}
        </Text>
      </Col>
    </Row>
  );
};
