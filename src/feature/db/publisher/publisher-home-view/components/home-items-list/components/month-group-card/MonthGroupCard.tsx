import { Text } from "@ionic-display/text/Text";
import type { MonthGroup } from "../../useHomeItems";
import { WeekGroupCard } from "../week-group-card/WeekGroupCard";
import { Item } from "@ionic-layout/item/Item";

type Props = {
  monthGroup: MonthGroup;
};

export const MonthGroupCard: React.FC<Props> = ({ monthGroup }) => {
  return (
    <>
      <Item className="ion-no-padding" lines="none">
        <Text size="xxl" bold color="secondary">
          {monthGroup.monthLabel.toUpperCase()}
        </Text>
      </Item>
      {monthGroup.weeks.map((week) => (
        <WeekGroupCard key={week.weekId} weekGroup={week} />
      ))}
      <Item lines="full" />
    </>
  );
};
