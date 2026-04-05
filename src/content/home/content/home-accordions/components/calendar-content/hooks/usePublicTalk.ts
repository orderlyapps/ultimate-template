import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { formatPublisherName } from "@format/formatPublisherName";

/**
 * Represents the first upcoming public talk for the congregation.
 */
export type PublicTalkItem = {
  dateLabel: string;
  outlineTheme: string;
  speakerLabel: string;
};

/**
 * Queries the first upcoming public talk for the user's congregation.
 * Joins speaker_assignment with outline, publisher, and congregation
 * collections to resolve the talk theme, speaker name, and congregation.
 * @returns the first public talk item (or null) and loading state
 */
export function usePublicTalk(): {
  publicTalk: PublicTalkItem | null;
  isLoading: boolean;
} {
  const congregationId = getUserCongregation()?.id;
  const thisWeekId = getThisWeekID();

  const { data: publicTalks } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .join({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o.id))
        .join({ p: publisherCollection }, ({ sa, p }) =>
          eq(sa.speaker_id, p.id),
        )
        .leftJoin({ c: congregationCollection }, ({ p, c }) =>
          eq(p!.congregation_id, c.id),
        )
        .where(({ sa }) =>
          and(
            eq(sa.congregation_id, congregationId),
            gte(sa.week_id, thisWeekId),
          ),
        )
        .select(({ sa, o, p, c }) => ({
          week_id: sa.week_id,
          outline_theme: o!.theme,
          speaker_first_name: p!.first_name,
          speaker_last_name: p!.last_name,
          speaker_display_name: p!.display_name,
          speaker_congregation_id: p!.congregation_id,
          congregation_name: c?.name ?? null,
        })),
    [congregationId, thisWeekId],
  );

  const isLoading = !!congregationId && publicTalks === undefined;

  // Pick the earliest upcoming talk
  const sorted = [...(publicTalks ?? [])].sort((a, b) =>
    a.week_id.localeCompare(b.week_id),
  );
  const first = sorted[0];

  if (!first) return { publicTalk: null, isLoading };

  const isLocal = first.speaker_congregation_id === congregationId;
  const speakerName = formatPublisherName(
    {
      first_name: first.speaker_first_name ?? "",
      last_name: first.speaker_last_name ?? "",
      display_name: first.speaker_display_name,
    },
    "display last",
  );

  // Append congregation name for visiting speakers
  const speakerLabel =
    !isLocal && first.congregation_name
      ? `${speakerName} — ${first.congregation_name}`
      : speakerName;

  return {
    publicTalk: {
      dateLabel: getTheocraticWeekLabel(first.week_id, {
        format: "week-range-capital-case",
        useRelativeWeek: true,
      }),
      outlineTheme: first.outline_theme ?? "",
      speakerLabel,
    },
    isLoading,
  };
}
