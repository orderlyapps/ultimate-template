import { Text } from "@ionic-display/text/Text";
import type { Event } from "@tanstack-db/event/eventSchema";

type Props = {
  event: Event;
};

export const ConventionCard: React.FC<Props> = ({ event }) => {
  return (
    <div>
      <Text size="md" bold>
        Convention
      </Text>
      <Text size="sm">{event.name}</Text>
      <Text size="sm">{event.start_date}</Text>
      {event.address && <Text size="sm">{event.address}</Text>}
    </div>
  );
};
