import { getThisWeekID } from "@date/getThisWeekID";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { and, eq, gte, like, lt, or, useLiveQuery } from "@tanstack/react-db";
import { addDays, format } from "date-fns";
import { SimpleListSection } from "./components/simple-list-section/SimpleListSection";

export const ThisWeek: React.FC = () => {
  const [publisher] = useUserPublisher();
  const publisherId = publisher?.id;

  const thisWeek = getThisWeekID();

  const startOfNextWeek = format(addDays(new Date(thisWeek), 7), "yyyy-MM-dd");

  const { data: midweekMeetingAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ m: midweekAssignmentCollection })
        .where(({ m }) =>
          and(eq(m.participant_id, publisherId), eq(m.week_id, thisWeek)),
        ),
    [publisherId, thisWeek],
  );

  const { data: weekendMeetingAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ m: weekendAssignmentCollection })
        .where(({ m }) =>
          and(eq(m.participant_id, publisherId), eq(m.week_id, thisWeek)),
        ),
    [publisherId, thisWeek],
  );

  const { data: midweekAVAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .where(({ av }) =>
          and(
            eq(av.participant_id, publisherId),
            eq(av.week_id, thisWeek),
            like(av.assignment_id, "%midweek"),
          ),
        ),
    [publisherId, thisWeek],
  );

  const { data: weekendAVAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .where(({ av }) =>
          and(
            eq(av.participant_id, publisherId),
            eq(av.week_id, thisWeek),
            like(av.assignment_id, "%weekend"),
          ),
        ),
    [publisherId, thisWeek],
  );

  const { data: events } = useLiveQuery(
    (q) =>
      q
        .from({
          e: eventCollection,
        })
        .where(({ e }) =>
          or(
            and(gte(e.start_date, thisWeek), lt(e.start_date, startOfNextWeek)),
            and(gte(e.end_date, thisWeek), lt(e.end_date, startOfNextWeek)),
          ),
        ),
    [thisWeek, startOfNextWeek],
  );

  return (
    <>
      <SimpleListSection
        title="Midweek Meeting Assignments"
        items={midweekMeetingAssignments?.map(
          (a) => `${a.week_id} - ${a.assignment_id}`,
        )}
      />
      <SimpleListSection
        title="Weekend Meeting Assignments"
        items={weekendMeetingAssignments?.map(
          (a) => `${a.week_id} - ${a.assignment_id}`,
        )}
      />
      <SimpleListSection
        title="Midweek AV Assignments"
        items={midweekAVAssignments?.map(
          (a) => `${a.week_id} - ${a.assignment_id}`,
        )}
      />
      <SimpleListSection
        title="Weekend AV Assignments"
        items={weekendAVAssignments?.map(
          (a) => `${a.week_id} - ${a.assignment_id}`,
        )}
      />
      <SimpleListSection
        title="Events"
        items={events?.map(
          (e) =>
            `${e.start_date}${e.end_date ? ` to ${e.end_date}` : ""} - ${e.name}`,
        )}
      />
    </>
  );
};
