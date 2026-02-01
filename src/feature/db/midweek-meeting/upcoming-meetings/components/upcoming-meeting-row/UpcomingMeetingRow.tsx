import { eq, useLiveQuery } from "@tanstack/react-db";
import { midweekMeetingDataCollection } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataCollection";
import type { FC } from "react";
import { List } from "@ionic-layout/list/List";
import { MeetingAgendaItems } from "./components/meeting-agenda-items/MeetingAgendaItems";
import { MidweekAVAssignments } from "./components/midweek-av-assignments/MidweekAVAssignments";
import { MidweekAttendantAssignments } from "./components/midweek-attendant-assignments/MidweekAttendantAssignments";
import { WeekEvents } from "@feature/db/shared/week-events/WeekEvents";
import { useBlockingEvents } from "@feature/db/shared/week-events/useBlockingEvents";
import { Space } from "@layout/space/Space";

type Props = {
  weekId: string;
};

export const UpcomingMeetingRow: FC<Props> = ({ weekId }) => {
  const hasBlockingEvent = useBlockingEvents(weekId, "midweek");

  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: midweekMeetingDataCollection,
      })
      .where(({ m }) => eq(m.week_id, weekId)),
  );

  const meeting = data?.[0];

  return (
    <List lines="none">
      <WeekEvents weekId={weekId} meetingType="midweek" />
      {!hasBlockingEvent && meeting && (
        <>
          <MeetingAgendaItems meeting={meeting} weekId={weekId} />
          <MidweekAVAssignments weekId={weekId} />
          <MidweekAttendantAssignments weekId={weekId} />
        </>
      )}
      <Space />
    </List>
  );
};
