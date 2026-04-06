import { and, eq, not, useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

/**
 * Hook to fetch speakers from the current congregation who have
 * assignments in other congregations (outgoing speakers).
 */
export const useOutgoingSpeakers = (weekId: string) => {
  const congregation = getUserCongregation();
  const congregationId = congregation?.id ?? "";

  const { data } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .innerJoin({ p: publisherCollection }, ({ sa, p }) =>
          eq(sa.speaker_id, p.id),
        )
        .leftJoin({ o: outlineCollection }, ({ sa, o }) =>
          eq(sa.outline_id, o!.id),
        )
        .leftJoin({ c: congregationCollection }, ({ sa, c }) =>
          eq(sa.congregation_id, c!.id),
        )
        .where(({ sa, p }) =>
          and(
            eq(sa.week_id, weekId),
            // Speaker belongs to current congregation
            eq(p.congregation_id, congregationId),
            // But assignment is for a different congregation
            not(eq(sa.congregation_id, congregationId)),
          ),
        )
        .select(({ sa, p, o, c }) => ({
          speakerId: sa.speaker_id,
          first_name: p.first_name,
          last_name: p.last_name,
          display_name: p.display_name,
          outlineTheme: o?.theme,
          targetCongregationName: c?.name,
          targetCongregationId: sa.congregation_id,
        })),
    [weekId, congregationId],
  );

  return { data };
};
