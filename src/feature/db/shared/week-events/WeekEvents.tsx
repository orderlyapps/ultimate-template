import type { FC } from "react";
import { and, eq, gte, lt, lte, or, useLiveQuery } from "@tanstack/react-db";
import { addDays, format } from "date-fns";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { CircuitAssemblyEvent } from "./components/circuit-assembly-event/CircuitAssemblyEvent";
import { ConventionEvent } from "./components/convention-event/ConventionEvent";
import { MemorialEvent } from "./components/memorial-event/MemorialEvent";
import { CircuitVisitEvent } from "./components/circuit-visit-event/CircuitVisitEvent";
import { SpecialMeetingEvent } from "./components/special-meeting-event/SpecialMeetingEvent";
import { SpecialTalkEvent } from "./components/special-talk-event/SpecialTalkEvent";
import type { Event } from "@tanstack-db/event/eventSchema";

type MeetingType = "midweek" | "weekend";

type Props = {
  weekId: string;
  meetingType: MeetingType;
};

const EventComponent: FC<{ event: Event; meetingType: MeetingType }> = ({
  event,
  meetingType,
}) => {
  switch (event.type) {
    case "circuit_assembly":
      return <CircuitAssemblyEvent event={event} />;
    case "convention":
      return <ConventionEvent event={event} />;
    case "memorial":
      return <MemorialEvent event={event} meetingType={meetingType} />;
    case "circuit_visit":
      return <CircuitVisitEvent />;
    case "special_meeting":
      return <SpecialMeetingEvent />;
    case "special_talk":
      return <SpecialTalkEvent />;
  }
};

export const WeekEvents: FC<Props> = ({ weekId, meetingType }) => {
  const [userCongregation] = useUserCongregation();
  const weekEnd = format(addDays(new Date(weekId), 7), "yyyy-MM-dd");

  const { data: events } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(
                eq(e.congregation_id, userCongregation.id),
                or(
                  and(gte(e.start_date, weekId), lt(e.start_date, weekEnd)),
                  and(gte(e.end_date, weekId), lt(e.end_date, weekEnd)),
                  and(lte(e.start_date, weekId), gte(e.end_date, weekEnd)),
                ),
                or(
                  eq(e.type, "circuit_assembly"),
                  eq(e.type, "circuit_visit"),
                  eq(e.type, "convention"),
                  eq(e.type, "memorial"),
                  eq(e.type, "special_meeting"),
                  eq(e.type, "special_talk"),
                ),
              ),
            )
        : undefined,
    [userCongregation?.id, weekId, weekEnd],
  );

  if (!events?.length) {
    return null;
  }

  return (
    <>
      {events.map((event) => (
        <EventComponent key={event.id} event={event} meetingType={meetingType} />
      ))}
    </>
  );
};
