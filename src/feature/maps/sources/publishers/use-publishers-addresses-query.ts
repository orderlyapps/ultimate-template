import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import { useLiveQuery } from "@tanstack/react-db";

export const usePublishersAddressesQuery = () => {
  return useLiveQuery((q) =>
    q.from({ pl: publisherLocalCollection }).select(({ pl }) => ({
      publisher_id: pl.publisher_id,
      address: pl.address,
    })),
  );
};
