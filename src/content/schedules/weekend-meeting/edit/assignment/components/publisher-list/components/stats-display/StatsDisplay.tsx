import { Text } from "@ionic-display/text/Text";
import type { PublisherAssignmentStats } from "../../../../hooks/usePublisherAssignmentStats";

type Props = {
  stats: PublisherAssignmentStats | undefined;
};

export const StatsDisplay: React.FC<Props> = ({ stats }) => {
  if (!stats) return null;

  const sinceSame = stats.weeksSinceSameAssignment ?? "-";
  const sinceAny = stats.weeksSinceAnyAssignment ?? "-";
  const untilSame = stats.weeksUntilSameAssignment ?? "-";
  const untilAny = stats.weeksUntilAnyAssignment ?? "-";
  const avgSame = stats.avgWeeksBetweenSameAssignment ?? "-";
  const avgAny = stats.avgWeeksBetweenAnyAssignment ?? "-";
  const hasAssignment = stats.hasCurrentWeekAssignment ? "✓" : "";

  return (
    <Text>
      {`${sinceSame} | ${sinceAny} | ${untilSame} | ${untilAny} | ${avgSame} | ${avgAny}${hasAssignment ? ` | ${hasAssignment}` : ""}`}
    </Text>
  );
};
