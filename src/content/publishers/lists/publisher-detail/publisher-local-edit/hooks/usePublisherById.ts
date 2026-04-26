import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

export const usePublisherById = (publisherId: string | undefined) => {
  return useLiveQuery(
    (q) => {
      if (!publisherId) return undefined;
      return q
        .from({ publisher: publisherCollection })
        .where(({ publisher }) => eq(publisher.id, publisherId));
    },
    [publisherId],
  );
};
