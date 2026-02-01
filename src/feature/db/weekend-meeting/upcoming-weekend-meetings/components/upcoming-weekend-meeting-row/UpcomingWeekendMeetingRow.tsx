import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { IncomingTalk } from "./components/incoming-talk/IncomingTalk";
import { WeekendAssignments } from "./components/weekend-assignments/WeekendAssignments";
import { WeekendAVAssignments } from "./components/weekend-av-assignments/WeekendAVAssignments";
import { WeekendAttendantAssignments } from "./components/weekend-attendant-assignments/WeekendAttendantAssignments";
import { OutgoingSpeakers } from "./components/outgoing-speakers/OutgoingSpeakers";
import { WeekEvents } from "./components/week-events/WeekEvents";

type Props = {
  weekId: string;
};

export const UpcomingWeekendMeetingRow: FC<Props> = ({ weekId }) => {
  return (
    <List lines="none">
      <WeekEvents weekId={weekId} />
      <IncomingTalk weekId={weekId} />
      <WeekendAssignments weekId={weekId} />
      <WeekendAVAssignments weekId={weekId} />
      <WeekendAttendantAssignments weekId={weekId} />
      <OutgoingSpeakers weekId={weekId} />
    </List>
  );
};
