import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { formatPublisherName } from "@format/formatPublisherName";
import { usePublisherListsStore } from "@/content/publishers/lists/store/usePublisherListsStore";

export function useFilteredPublishers() {
  const { filters, searchQuery } = usePublisherListsStore();

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const filteredPublishers = publishers?.filter((publisher) => {
    if (
      filters.standing.length > 0 &&
      !filters.standing.includes(publisher.standing)
    ) {
      return false;
    }
    if (filters.type.length > 0 && !filters.type.includes(publisher.type)) {
      return false;
    }
    if (
      filters.gender.length > 0 &&
      !filters.gender.includes(publisher.gender)
    ) {
      return false;
    }
    if (
      filters.group.length > 0 &&
      (!publisher.group_id || !filters.group.includes(publisher.group_id))
    ) {
      return false;
    }
    if (searchQuery) {
      const name = formatPublisherName(publisher).toLowerCase();
      if (!name.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return { publishers, filteredPublishers };
}
