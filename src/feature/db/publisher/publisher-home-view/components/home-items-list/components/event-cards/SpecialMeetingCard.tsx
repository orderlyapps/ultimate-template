import { Text } from "@ionic-display/text/Text";
import type { Event } from "@tanstack-db/event/eventSchema";
import { formatEventDate } from "@date/formatEventDate";

type Props = {
  event: Event;
};

export const SpecialMeetingCard: React.FC<Props> = ({ event }) => {
  return (
    <div>
      <Text size="md" bold>
        {formatEventDate(event.start_date)}
      </Text>
      <br />
      <Text size="md">Special Meeting</Text>
      <Text size="sm">{event.name}</Text>
      {event.address && <Text size="sm">{event.address}</Text>}
    </div>
  );
};
