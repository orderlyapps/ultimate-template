import { eq, useLiveQuery } from "@tanstack/react-db";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

/** Shape returned for each local speaker */
export type LocalSpeaker = {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string | null | undefined;
};

/**
 * Hook to fetch publishers from the user's congregation who have
 * at least one speaker outline assigned.
 *
 * Joins speaker_outline → publisher and deduplicates by publisher id.
 *
 * @returns speakers - Array of unique local speakers sorted by last name
 */
export const useLocalSpeakers = () => {
  const congregation = getUserCongregation();
  const congregationId = congregation?.id ?? "";

  const { data } = useLiveQuery(
    (q) =>
      q
        .from({ so: speakerOutlineCollection })
        .join({ p: publisherCollection }, ({ so, p }) =>
          eq(so.speaker_id, p.id),
        )
        .where(({ p }) => eq(p.congregation_id, congregationId))
        .select(({ p }) => ({
          id: p.id,
          first_name: p.first_name,
          last_name: p.last_name,
          display_name: p.display_name,
        })),
    [congregationId],
  );

  // Deduplicate — a publisher may have many outlines
  const seen = new Set<string>();
  const speakers: LocalSpeaker[] = [];
  for (const row of data ?? []) {
    if (!row.id || !row.first_name || !row.last_name) continue;
    if (!seen.has(row.id)) {
      seen.add(row.id);
      speakers.push({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        display_name: row.display_name,
      });
    }
  }

  // Sort alphabetically by last name, then first name
  speakers.sort(
    (a, b) =>
      a.last_name.localeCompare(b.last_name) ||
      a.first_name.localeCompare(b.first_name),
  );

  return { speakers };
};
