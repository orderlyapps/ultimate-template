import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

/**
 * Returns all publishers belonging to a specific group, ordered by last name.
 * @param groupId - The group UUID to filter publishers by
 */
export const usePublishersByGroup = (groupId: string) => {
  return useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.group_id, groupId))
        .orderBy(({ p }) => p.last_name),
    [groupId],
  );
};
