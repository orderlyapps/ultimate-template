import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  header: {
    marginBottom: 3,
    borderBottom: "1pt solid #333",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  month: {
    fontSize: 16,
    color: "#666",
  },
});

type SchedulePdfHeaderProps = {
  /** The name of the schedule (e.g. "Midweek Meeting") */
  readonly scheduleName: string;
  /** Any date within the target month — used to derive the month label */
  readonly monthDate: string | Date;
};

/**
 * Reusable header for monthly schedule PDFs.
 * Renders the schedule name as a large title and the full month name + year beneath it.
 *
 * @example
 * <SchedulePdfHeader scheduleName="Midweek Meeting" monthDate={dateRange.firstMonday} />
 */
export const SchedulePdfHeader: React.FC<SchedulePdfHeaderProps> = ({
  scheduleName,
  monthDate,
}) => {
  const monthLabel = format(new Date(monthDate), "MMMM");

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {scheduleName} Schedule for {monthLabel}
      </Text>
    </View>
  );
};
