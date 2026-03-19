import { eq, useLiveQuery } from "@tanstack/react-db";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";

export function useGroupData(groupId: string) {
  const { data: groups } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, groupId))
  );

  const { data: members } = useLiveQuery(
    (q) =>
      groupId
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) => eq(p.group_id, groupId))
            .orderBy(({ p }) => p.last_name)
        : undefined,
    [groupId]
  );

  const { data: allPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name)
  );

  const group = groups?.[0];

  return { group, members, allPublishers };
}
