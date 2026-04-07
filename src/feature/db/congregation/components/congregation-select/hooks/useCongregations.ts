import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useLiveQuery } from "@tanstack/react-db";

/**
 * Hook to fetch all congregations from the database.
 * Returns all congregations sorted by name.
 */
export const useCongregations = () => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        c: congregationCollection,
      })
      .orderBy(({ c }) => c.name),
  );

  return { congregations: data ?? [] };
};
