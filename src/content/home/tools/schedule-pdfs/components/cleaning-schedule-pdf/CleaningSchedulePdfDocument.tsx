import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { SchedulePdfHeader } from "../schedule-pdf-header/SchedulePdfHeader";
import { PdfPage } from "@services/vendor/pdf/pdf-page";
import { useCleaningScheduleData } from "./hooks/useCleaningScheduleData";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";

const styles = StyleSheet.create({
  weekSection: {
    marginBottom: 8,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 6,
  },
  weekDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  assignmentsContainer: {
    flexDirection: "row",
  },
  assignmentColumn: {
    width: "50%",
    flexDirection: "row",
    fontSize: 11,
    fontWeight: "bold",
  },
  assignmentLabel: {
    fontSize: 12,
    color: "#666",
    marginRight: 4,
    fontWeight: "bold",
  },
  assignmentValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "medium",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 14,
  },
});

type CleaningSchedulePdfDocumentProps = {
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
};

/**
 * Renders a single week's cleaning assignments
 */
function WeekSection({
  weekId,
  majorGroup,
  minorGroup,
}: {
  weekId: string;
  majorGroup: { name: string } | undefined;
  minorGroup: { name: string } | undefined;
}) {
  const dateLabel = getTheocraticWeekLabel(weekId, {
    format: "week-range-capital-case",
  });

  return (
    <View style={styles.weekSection}>
      <Text style={styles.weekDate}>{dateLabel}</Text>

      <View style={styles.assignmentsContainer}>
        <View style={styles.assignmentColumn}>
          <Text style={styles.assignmentLabel}>Light Clean:</Text>
          <Text style={styles.assignmentValue}>{minorGroup?.name ?? "—"}</Text>
        </View>

        <View style={styles.assignmentColumn}>
          <Text style={styles.assignmentLabel}>Thorough Clean:</Text>
          <Text style={styles.assignmentValue}>{majorGroup?.name ?? "—"}</Text>
        </View>
      </View>
    </View>
  );
}

/**
 * PDF Document component for the Cleaning schedule.
 * Displays all weekly cleaning assignments for the selected month.
 */
export function CleaningSchedulePdfDocument({
  dateRange,
}: CleaningSchedulePdfDocumentProps) {
  const { weeks, isLoading } = useCleaningScheduleData(dateRange);

  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader
            scheduleName="Cleaning Schedule"
            monthDate={dateRange.firstMonday}
          />
          <Text style={styles.noData}>Loading schedule data...</Text>
        </PdfPage>
      </Document>
    );
  }

  if (weeks.length === 0) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader
            scheduleName="Cleaning Schedule"
            monthDate={dateRange.firstMonday}
          />
          <Text style={styles.noData}>
            No schedule data found for the selected month.
          </Text>
        </PdfPage>
      </Document>
    );
  }

  return (
    <Document>
      <PdfPage>
        <SchedulePdfHeader
          scheduleName="Cleaning Schedule"
          monthDate={dateRange.firstMonday}
        />
        {weeks.map((week) => (
          <WeekSection
            key={week.weekId}
            weekId={week.weekId}
            majorGroup={week.majorGroup}
            minorGroup={week.minorGroup}
          />
        ))}
      </PdfPage>
    </Document>
  );
}
