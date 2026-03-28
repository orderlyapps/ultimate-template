import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

export const usePublisherLocal = (publisherId: string | undefined) => {
  return useLiveQuery(
    (q) => {
      if (!publisherId) return undefined;
      return q
        .from({ publisher: publisherLocalCollection })
        .where(({ publisher }) => eq(publisher.publisher_id, publisherId));
    },
    [publisherId],
  );
};
