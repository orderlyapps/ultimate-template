import type { FC } from "react";
import { IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../groupCleaningByMonth";

type Props = {
  week: WeekGroup;
  groupMap: Map<string, string>;
};

export const CleaningWeekGroup: FC<Props> = ({ week, groupMap }) => {
  return (
    <Item>
      <IonLabel>
        <Text>{week.weekLabel}</Text>
        {week.entries.map((entry) => (
          <>
            <br />
            <Text key={entry.type} bold>
              {entry.type === "major" ? "Thorough" : "Light"}:{" "}
            </Text>
            <Text key={entry.type}>{groupMap.get(entry.group_id) ?? ""}</Text>
          </>
        ))}
      </IonLabel>
    </Item>
  );
};
