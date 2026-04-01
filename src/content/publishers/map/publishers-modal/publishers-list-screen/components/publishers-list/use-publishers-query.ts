import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";

export const usePublishersQuery = () => {
  const data = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .leftJoin({ pl: publisherLocalCollection }, ({ p, pl }) => {
        return eq(pl.publisher_id, p.id);
      })
      .orderBy(({ p }) => p.last_name)
      .select(({ p, pl }) => {
        return { publisher: p, publisher_local: pl };
      })
  );

  return data;
};
