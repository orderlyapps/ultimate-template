import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useLiveQuery } from "@tanstack/react-db";

export const usePublishersQuery = () => {
  return useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );
};
