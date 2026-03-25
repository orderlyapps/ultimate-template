import { and, eq, or, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";

export const usePublishers = () => {
  const [userCongregation] = useUserCongregation();
  const congregationId = userCongregation?.id ?? "";

  const { data } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .orderBy(({ p }) => p.last_name)
        .orderBy(({ p }) => p.display_name)
        .orderBy(({ p }) => p.first_name)
        .where(({ p }) => {
          return and(
            eq(p.congregation_id, congregationId),
            or(eq(p.standing, "elder"), eq(p.standing, "ministerial_servant")),
          );
        }),
    [congregationId],
  );

  return {
    publishers: data,
  };
};
