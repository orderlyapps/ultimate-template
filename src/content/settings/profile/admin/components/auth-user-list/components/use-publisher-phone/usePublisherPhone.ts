import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

/**
 * Returns a lookup function `phoneFor(publisherId)` backed by the local
 * rxdb `publisher` collection. Used to prefill SMS sends with the
 * publisher's contact number when delivering an OTP.
 */
export const usePublisherPhoneLookup = (): ((id: string) => string | null) => {
  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }),
  );

  return (publisherId: string) => {
    if (!data) return null;
    const local = data.find((row) => row.publisher_id === publisherId);
    return local?.phone?.[0]?.number ?? null;
  };
};
