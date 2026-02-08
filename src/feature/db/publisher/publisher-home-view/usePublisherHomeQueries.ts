import { and, eq, gte, or, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

const emptyResult = {
  weekendAssignments: [] as never[],
  speakerAssignments: [] as never[],
  midweekAssignments: [] as never[],
  events: [] as never[],
  avAssignments: [] as never[],
};

export const usePublisherHomeQueries = (
  publisher: Publisher | null | undefined,
) => {
  const publisherId = publisher?.id ?? "";
  const congregationId = getUserCongregation()?.id;
  const thisWeekId = getThisWeekID();
  const enabled = !!publisher;

  const { data: weekendAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .where(({ wa }) =>
          and(
            eq(wa.participant_id, publisherId),
            eq(wa.congregation_id, congregationId),
            gte(wa.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  const { data: speakerAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .where(({ sa }) =>
          and(
            eq(sa.speaker_id, publisherId),
            eq(sa.congregation_id, congregationId),
            gte(sa.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  const { data: midweekAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ ma: midweekAssignmentCollection })
        .where(({ ma }) =>
          and(
            eq(ma.participant_id, publisherId),
            eq(ma.congregation_id, congregationId),
            gte(ma.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  const { data: events } = useLiveQuery(
    (q) =>
      q
        .from({ e: eventCollection })
        .where(({ e }) =>
          and(
            eq(e.congregation_id, congregationId),
            or(gte(e.start_date, thisWeekId), gte(e.end_date, thisWeekId)),
          ),
        ),
    [congregationId, thisWeekId],
  );

  const { data: avAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .where(({ av }) =>
          and(
            eq(av.participant_id, publisherId),
            eq(av.congregation_id, congregationId),
            gte(av.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  console.log("events", events);

  if (!enabled) {
    return { ...emptyResult, events };
  }

  return {
    weekendAssignments,
    speakerAssignments,
    midweekAssignments,
    events,
    avAssignments,
  };
};
