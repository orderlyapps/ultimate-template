import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

export const useWeekendAssignments = (weekId: string) => {
  const congregation = getUserCongregation();
  const congregationId = congregation?.id ?? "";

  const { data } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .leftJoin({ p: publisherCollection }, ({ wa, p }) =>
          eq(wa.participant_id, p!.id),
        )
        .where(({ wa }) =>
          and(
            eq(wa.week_id, weekId),
            eq(wa.congregation_id, congregationId),
          ),
        )
        .select(({ wa, p }) => ({
          assignment_id: wa.assignment_id,
          participant_id: wa.participant_id,
          first_name: p?.first_name,
          last_name: p?.last_name,
          display_name: p?.display_name,
        })),
    [weekId, congregationId],
  );

  return { data };
};
