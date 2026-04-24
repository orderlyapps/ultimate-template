import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

/**
 * Returns all publishers ordered by name.
 * `publishersWithoutAuth` is filtered to those without an existing auth_id.
 */
export const useAdminPublishers = () => {
  const { data: publishers } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .orderBy(({ p }) => p.last_name)
        .orderBy(({ p }) => p.display_name)
        .orderBy(({ p }) => p.first_name),
    [],
  );

  const publishersWithoutAuth = publishers?.filter((p) => !p.auth_id) ?? [];

  return { publishers: publishers ?? [], publishersWithoutAuth };
};
