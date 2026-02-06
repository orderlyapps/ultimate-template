import type { FC } from "react";
import { IonListHeader } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import type { MonthGroup } from "../../groupCleaningByMonth";
import { CleaningWeekGroup } from "../cleaning-week-group/CleaningWeekGroup";

type Props = {
  group: MonthGroup;
  groupMap: Map<string, string>;
};

export const CleaningMonthGroup: FC<Props> = ({ group, groupMap }) => {
  return (
    <List>
      <IonListHeader>
        <Text size="xl" color="primary">
          {group.label.toUpperCase()}
        </Text>
      </IonListHeader>
      {group.weeks.map((week) => (
        <CleaningWeekGroup key={week.weekId} week={week} groupMap={groupMap} />
      ))}
    </List>
  );
};
