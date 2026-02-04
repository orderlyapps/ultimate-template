import { Text } from "@ionic-display/text/Text";
import type { WeekGroup } from "../../useHomeItems";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";

type Props = {
  weekGroup: WeekGroup;
};

export const WeekGroupCard: React.FC<Props> = ({ weekGroup }) => {
  return (
    <div>
      <Text size="md" bold>
        {getTheocraticWeekLabel(weekGroup.weekId)}
      </Text>
      {weekGroup.assignments.map((assignment) => (
        <div key={assignment.key}>
          <Text size="sm">
            {assignment.kind}
            {assignment.title ? `: ${assignment.title}` : ""}
          </Text>
        </div>
      ))}
    </div>
  );
};
