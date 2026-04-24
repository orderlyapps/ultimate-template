import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

/**
 * Looks up the first phone number for a publisher from the local (RxDB) store.
 * Returns undefined if no phone number is recorded.
 */
export const usePublisherPhone = (publisherId: string | undefined) => {
  const { data } = useLiveQuery(
    (q) => {
      if (!publisherId) return undefined;
      return q
        .from({ pub: publisherLocalCollection })
        .where(({ pub }) => eq(pub.publisher_id, publisherId));
    },
    [publisherId],
  );

  const firstPhone = data?.[0]?.phone?.[0]?.number;

  return { phoneNumber: firstPhone };
};
