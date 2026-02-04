import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { useHomeItems } from "./useHomeItems";
import { WeekGroupCard } from "./components/week-group-card/WeekGroupCard";
import { EventCard } from "./components/event-cards/EventCard";

type Props = {
  weekendAssignments: WeekendAssignment[] | undefined;
  speakerAssignments: SpeakerAssignment[] | undefined;
  midweekAssignments: MidweekAssignment[] | undefined;
  events: Event[] | undefined;
  avAssignments: AVAssignment[] | undefined;
};

export const HomeItemsList: React.FC<Props> = ({
  weekendAssignments,
  speakerAssignments,
  midweekAssignments,
  events,
  avAssignments,
}) => {
  const { items } = useHomeItems({
    weekendAssignments,
    speakerAssignments,
    midweekAssignments,
    avAssignments,
    events,
  });

  return (
    <>
      {items.map((item) => {
        if (item.type === "week") {
          return (
            <div key={item.weekId}>
              <WeekGroupCard weekGroup={item} />
            </div>
          );
        }
        return (
          <div key={item.event.id}>
            <EventCard event={item.event} />
          </div>
        );
      })}
    </>
  );
};
