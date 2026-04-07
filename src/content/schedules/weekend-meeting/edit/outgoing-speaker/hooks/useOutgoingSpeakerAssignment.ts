import { and, eq, useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";

/**
 * Hook to fetch details for a specific outgoing speaker assignment.
 * Returns the speaker, outline, and target congregation details.
 * Returns undefined data if speakerId is empty (for add mode).
 */
export const useOutgoingSpeakerAssignment = (
  weekId: string,
  speakerId: string,
) => {
  const { data } = useLiveQuery(
    (q) => {
      // Skip query if speakerId is empty (add mode)
      if (!speakerId) {
        return undefined;
      }
      return q
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
        .where(({ sa }) =>
          and(eq(sa.week_id, weekId), eq(sa.speaker_id, speakerId)),
        )
        .select(({ sa, p, o, c }) => ({
          speakerId: sa.speaker_id,
          first_name: p.first_name,
          last_name: p.last_name,
          display_name: p.display_name,
          outlineId: sa.outline_id,
          outlineTheme: o?.theme,
          targetCongregationId: sa.congregation_id,
          targetCongregationName: c?.name,
        }));
    },
    [weekId, speakerId],
  );

  return { data: data?.[0] };
};
