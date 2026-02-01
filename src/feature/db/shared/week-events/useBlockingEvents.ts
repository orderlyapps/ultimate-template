import { and, eq, gte, lt, lte, or, useLiveQuery } from "@tanstack/react-db";
import { addDays, format, getDay, parseISO } from "date-fns";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";

type MeetingType = "midweek" | "weekend";

export const useBlockingEvents = (
  weekId: string,
  meetingType: MeetingType,
): boolean => {
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
                  eq(e.type, "convention"),
                  eq(e.type, "memorial"),
                ),
              ),
            )
        : undefined,
    [userCongregation?.id, weekId, weekEnd],
  );

  if (!events?.length) {
    return false;
  }

  const hasCircuitAssemblyOrConvention = events.some(
    (e) => e.type === "circuit_assembly" || e.type === "convention",
  );

  if (hasCircuitAssemblyOrConvention) {
    return true;
  }

  const memorial = events.find((e) => e.type === "memorial");
  if (memorial) {
    const dayOfWeek = getDay(parseISO(memorial.start_date));
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isMidweek = dayOfWeek >= 1 && dayOfWeek <= 5;

    if (meetingType === "midweek" && isMidweek) {
      return true;
    }
    if (meetingType === "weekend" && isWeekend) {
      return true;
    }
  }

  return false;
};
