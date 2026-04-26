import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

/**
 * Looks up the confidential_id for a publisher by their publisher_id
 * from the local RxDB-backed collection.
 * @param publisherId - The publisher's public UUID
 */
export const useConfidentialId = (publisherId: string | undefined) => {
  const { data, isLoading } = useLiveQuery(
    (q) => {
      if (!publisherId) return undefined;
      return q
        .from({ pl: publisherLocalCollection })
        .where(({ pl }) => eq(pl.publisher_id, publisherId));
    },
    [publisherId],
  );

  const confidentialId = data?.[0]?.confidential_id as string | undefined;

  return { confidentialId, isLoading };
};
