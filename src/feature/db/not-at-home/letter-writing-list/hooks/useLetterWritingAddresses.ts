import { eq, useLiveQuery } from "@tanstack/react-db";
import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";

export const useLetterWritingAddresses = () => {
  const [userCongregation] = useUserCongregation();

  const { data: writeAddresses } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ nah: notAtHomeCollection })
            .where(({ nah }) => eq(nah.congregation_id, userCongregation.id))
            .where(({ nah }) => eq(nah.write, true))
        : undefined,
    [userCongregation?.id],
  );

  const { data: nonWriteAddresses } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ nah: notAtHomeCollection })
            .where(({ nah }) => eq(nah.congregation_id, userCongregation.id))
            .where(({ nah }) => eq(nah.write, false))
        : undefined,
    [userCongregation?.id],
  );

  // Sort by created_at ascending and take 5 oldest — done in JS
  // because TanStack DB orderBy+limit requires a collection index
  const oldestNonWriteAddresses = nonWriteAddresses
    ?.slice()
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .slice(0, 5);

  const { data: suburbs } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ s: suburbCollection })
            .where(({ s }) => eq(s.congregation_id, userCongregation.id))
        : undefined,
    [userCongregation?.id],
  );

  const { data: streets } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ s: streetCollection })
            .where(({ s }) => eq(s.congregation_id, userCongregation.id))
        : undefined,
    [userCongregation?.id],
  );

  const writeCount = writeAddresses?.length ?? 0;
  const addresses = [
    ...(writeAddresses ?? []),
    ...(writeCount < 5 ? (oldestNonWriteAddresses ?? []) : []),
  ];

  return { addresses, suburbs, streets };
};
