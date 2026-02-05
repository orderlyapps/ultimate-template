import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";
import { useHomeItems } from "./useHomeItems";
import { MonthGroupCard } from "./components/month-group-card/MonthGroupCard";

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
      {items.map((item) => (
        <div key={item.monthId}>
          <MonthGroupCard monthGroup={item} />
        </div>
      ))}
    </>
  );
};
