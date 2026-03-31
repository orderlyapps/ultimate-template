import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";

export const useHouseholdMemberQuery = (publisherId: string) => {
  const result = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .where(({ p }) => eq(p.id, publisherId))
      .select(({ p }) => p),
  );

  return {
    ...result,
    data: result.data?.[0],
  };
};
