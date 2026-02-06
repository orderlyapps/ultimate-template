import type { FC } from "react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { cleanMajorCollection } from "@tanstack-db/clean_major/cleanMajorCollection";
import { cleanMinorCollection } from "@tanstack-db/clean_minor/cleanMinorCollection";
import { groupCollection } from "@tanstack-db/group/groupCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { groupCleaningByMonth } from "./groupCleaningByMonth";
import { CleaningMonthGroup } from "./components/cleaning-month-group/CleaningMonthGroup";

export const CleaningList: FC = () => {
  const [userCongregation] = useUserCongregation();

  const { data: majorEntries } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ cm: cleanMajorCollection })
            .where(({ cm }) => eq(cm.congregation_id, userCongregation.id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [userCongregation?.id],
  );

  const { data: minorEntries } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ cm: cleanMinorCollection })
            .where(({ cm }) => eq(cm.congregation_id, userCongregation.id))
            .orderBy(({ cm }) => cm.week_id)
        : undefined,
    [userCongregation?.id],
  );

  const { data: groups } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ g: groupCollection })
            .where(({ g }) => eq(g.congregation_id, userCongregation.id))
        : undefined,
    [userCongregation?.id],
  );

  const groupMap = new Map(groups?.map((g) => [g.id, g.name]) ?? []);

  const combined = [
    ...(majorEntries?.map((e) => ({ ...e, type: "major" as const })) ?? []),
    ...(minorEntries?.map((e) => ({ ...e, type: "minor" as const })) ?? []),
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));

  if (!combined.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No cleaning assignments</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  const monthGroups = groupCleaningByMonth(combined);

  return (
    <>
      {monthGroups.map((group) => (
        <CleaningMonthGroup
          key={group.label}
          group={group}
          groupMap={groupMap}
        />
      ))}
    </>
  );
};
