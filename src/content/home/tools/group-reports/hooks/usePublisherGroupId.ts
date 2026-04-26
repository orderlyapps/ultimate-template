import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

/**
 * Returns the group_id for a publisher by their publisher id.
 * @param publisherId - The publisher's public UUID
 */
export const usePublisherGroupId = (publisherId: string | undefined) => {
  const { data, isLoading } = useLiveQuery(
    (q) => {
      if (!publisherId) return undefined;
      return q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.id, publisherId));
    },
    [publisherId],
  );

  return { groupId: data?.[0]?.group_id ?? null, isLoading };
};
