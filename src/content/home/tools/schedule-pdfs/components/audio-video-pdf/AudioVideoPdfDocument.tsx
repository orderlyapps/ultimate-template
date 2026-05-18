import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Fragment } from "react";
import { SchedulePdfHeader } from "../schedule-pdf-header/SchedulePdfHeader";
import { PdfPage } from "@services/vendor/pdf/pdf-page";
import { useAudioVideoScheduleData } from "./hooks/useAudioVideoScheduleData";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { formatPublisherName } from "@format/formatPublisherName";

const styles = StyleSheet.create({
  weekSection: {
    marginBottom: 8,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 6,
  },
  weekDate: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  meetingHeading: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
    marginTop: 4,
    marginBottom: 2,
  },
  assignmentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  assignmentCell: {
    width: "23%",
    marginBottom: 4,
  },
  assignmentLabel: {
    fontSize: 8,
    color: "#666",
  },
  assignmentValue: {
    fontSize: 9,
    color: "#333",
  },
  eventText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
    padding: 4,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 14,
  },
});

type AudioVideoPdfDocumentProps = {
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
};

/**
 * Renders a single week's audio/video assignments
 */
function WeekSection({
  weekId,
  assignments,
  events,
  assignmentLabels,
  midweekAVAssignmentIDs,
  weekendAVAssignmentIDs,
}: {
  weekId: string;
  assignments: Map<string, { first_name: string; last_name: string; display_name?: string | null } | undefined>;
  events: { type: string }[];
  assignmentLabels: Record<string, string>;
  midweekAVAssignmentIDs: readonly string[];
  weekendAVAssignmentIDs: readonly string[];
}) {
  const dateLabel = getTheocraticWeekLabel(weekId, { format: "week-range-capital-case" });

  // Check if there are any midweek or weekend assignments
  const hasMidweekAssignments = midweekAVAssignmentIDs.some(
    (id) => assignments.get(id) !== undefined,
  );
  const hasWeekendAssignments = weekendAVAssignmentIDs.some(
    (id) => assignments.get(id) !== undefined,
  );

  // Check for special events
  const hasCircuitAssembly = events.some((e) => e.type === "circuit_assembly");
  const hasConvention = events.some((e) => e.type === "convention");

  return (
    <View style={styles.weekSection}>
      <Text style={styles.weekDate}>{dateLabel}</Text>

      {hasCircuitAssembly && (
        <Text style={styles.eventText}>Circuit Assembly</Text>
      )}

      {hasConvention && <Text style={styles.eventText}>Convention</Text>}

      {hasMidweekAssignments && (
        <Fragment>
          <Text style={styles.meetingHeading}>Midweek Meeting</Text>
          <View style={styles.assignmentRow}>
            {midweekAVAssignmentIDs.map((id) => {
              const participant = assignments.get(id);
              if (!participant) return null;
              return (
                <View key={id} style={styles.assignmentCell}>
                  <Text style={styles.assignmentLabel}>{assignmentLabels[id]}</Text>
                  <Text style={styles.assignmentValue}>
                    {formatPublisherName(participant, "display last")}
                  </Text>
                </View>
              );
            })}
          </View>
        </Fragment>
      )}

      {hasWeekendAssignments && (
        <Fragment>
          <Text style={styles.meetingHeading}>Weekend Meeting</Text>
          <View style={styles.assignmentRow}>
            {weekendAVAssignmentIDs.map((id) => {
              const participant = assignments.get(id);
              if (!participant) return null;
              return (
                <View key={id} style={styles.assignmentCell}>
                  <Text style={styles.assignmentLabel}>{assignmentLabels[id]}</Text>
                  <Text style={styles.assignmentValue}>
                    {formatPublisherName(participant, "display last")}
                  </Text>
                </View>
              );
            })}
          </View>
        </Fragment>
      )}
    </View>
  );
}

/**
 * PDF Document component for the Audio/Video schedule.
 * Displays all weekly AV assignments for the selected month.
 */
export function AudioVideoPdfDocument({
  dateRange,
}: AudioVideoPdfDocumentProps) {
  const {
    weeks,
    assignmentLabels,
    midweekAVAssignmentIDs,
    weekendAVAssignmentIDs,
    isLoading,
  } = useAudioVideoScheduleData(dateRange);

  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader
            scheduleName="Audio & Video"
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
            scheduleName="Audio & Video"
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
          scheduleName="Audio & Video"
          monthDate={dateRange.firstMonday}
        />
        {weeks.map((week) => (
          <WeekSection
            key={week.weekId}
            weekId={week.weekId}
            assignments={week.assignments}
            events={week.events}
            assignmentLabels={assignmentLabels}
            midweekAVAssignmentIDs={midweekAVAssignmentIDs}
            weekendAVAssignmentIDs={weekendAVAssignmentIDs}
          />
        ))}
      </PdfPage>
    </Document>
  );
}
