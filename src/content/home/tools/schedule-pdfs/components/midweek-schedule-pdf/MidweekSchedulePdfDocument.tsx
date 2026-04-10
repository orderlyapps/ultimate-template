import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { SchedulePdfHeader } from "../schedule-pdf-header/SchedulePdfHeader";
import { useMidweekScheduleData } from "./hooks/useMidweekScheduleData";
import type { WeekScheduleData } from "./hooks/useMidweekScheduleData";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { AssignmentRow } from "./components/assignment-row/AssignmentRow";
import { formatPublisherName } from "@format/formatPublisherName";
import { PdfPage } from "@services/vendor/pdf/pdf-page";

const styles = StyleSheet.create({
  weekSection: {
    marginBottom: 2,
    borderBottom: "1pt solid #ddd",
    paddingBottom: 2,
  },
  weekDate: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#333",
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#444",
  },
  row: {
    flexDirection: "row",
  },
  noData: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 14,
  },
});

type MidweekSchedulePdfDocumentProps = {
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
};

/**
 * Gets the display name for a publisher
 */
// function formatPublisherName(
//   publisher:
//     | { first_name: string; last_name: string; display_name?: string | null }
//     | undefined,
// ): string {
//   if (!publisher) return "—";
//   if (publisher.display_name) return publisher.display_name;
//   return `${publisher.first_name} ${publisher.last_name}`;
// }

/**
 * Renders a single week's schedule
 */
function WeekSection({ week }: { week: WeekScheduleData }) {
  const { meetingData, assignments } = week;
  const dateLabel = getTheocraticWeekLabel(week.weekId);
  return (
    <View style={styles.weekSection}>
      <Text style={styles.weekDate}>{dateLabel}</Text>

      {/* Treasures from God's Word */}
      <View style={styles.section}>
        <AssignmentRow
          assignmentId="chairman_1"
          title="Chairman"
          participant={formatPublisherName(
            assignments.get("chairman_1"),
            "display last",
          )}
        />
        <AssignmentRow
          assignmentId="prayer_1"
          title="Opening Prayer"
          participant={formatPublisherName(
            assignments.get("prayer_1"),
            "display last",
          )}
        />
        <AssignmentRow
          assignmentId="tgw_talk"
          title={meetingData.mwb_tgw_talk_title ?? "Talk"}
          participant={formatPublisherName(
            assignments.get("treasures"),
            "display last",
          )}
        />
        <AssignmentRow
          assignmentId="tgw_gems"
          title={meetingData.mwb_tgw_gems_title ?? "Spiritual Gems"}
          participant={formatPublisherName(
            assignments.get("gems"),
            "display last",
          )}
        />
        <AssignmentRow
          assignmentId="tgw_bread"
          title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
          participant={formatPublisherName(
            assignments.get("school_1_bible_reading"),
            "display last",
          )}
        />
      </View>

      {/* Apply Yourself to the Field Ministry */}
      <View style={styles.section}>
        {meetingData.mwb_ayf_part1 && (
          <AssignmentRow
            assignmentId="ayf_part1"
            title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
            participant={formatPublisherName(
              assignments.get("school_1_apply_1"),
              "display last",
            )}
            assistantOrReader={formatPublisherName(
              assignments.get("school_1_assistant_1"),
              "display last",
            )}
            assistantLabel="Assistants"
          />
        )}
        {meetingData.mwb_ayf_part2 && (
          <AssignmentRow
            assignmentId="ayf_part2"
            title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
            participant={formatPublisherName(
              assignments.get("school_1_apply_2"),
              "display last",
            )}
            assistantOrReader={formatPublisherName(
              assignments.get("school_1_assistant_2"),
              "display last",
            )}
            assistantLabel="Assistant"
          />
        )}
        {meetingData.mwb_ayf_part3 && (
          <AssignmentRow
            assignmentId="ayf_part3"
            title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
            participant={formatPublisherName(
              assignments.get("school_1_apply_3"),
              "display last",
            )}
            assistantOrReader={formatPublisherName(
              assignments.get("school_1_assistant_3"),
              "display last",
            )}
            assistantLabel="Assistant"
          />
        )}
        {meetingData.mwb_ayf_part4 && (
          <AssignmentRow
            assignmentId="ayf_part4"
            title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
            participant={formatPublisherName(
              assignments.get("school_1_apply_4"),
              "display last",
            )}
            assistantOrReader={formatPublisherName(
              assignments.get("school_1_assistant_4"),
              "display last",
            )}
            assistantLabel="Assistant"
          />
        )}
      </View>

      {/* Living as Christians */}
      <View style={styles.section}>
        {meetingData.mwb_lc_part1 && (
          <AssignmentRow
            assignmentId="lc_part1"
            title={meetingData.mwb_lc_part1_title ?? meetingData.mwb_lc_part1}
            participant={formatPublisherName(
              assignments.get("living_1"),
              "display last",
            )}
          />
        )}
        {meetingData.mwb_lc_part2 && (
          <AssignmentRow
            assignmentId="lc_part2"
            title={meetingData.mwb_lc_part2_title ?? meetingData.mwb_lc_part2}
            participant={formatPublisherName(
              assignments.get("living_2"),
              "display last",
            )}
          />
        )}
        <AssignmentRow
          assignmentId="lc_cbs"
          title={meetingData.mwb_lc_cbs_title ?? "Congregation Bible Study"}
          participant={formatPublisherName(
            assignments.get("cbs_conductor"),
            "display last",
          )}
          assistantOrReader={formatPublisherName(
            assignments.get("cbs_reader"),
            "display last",
          )}
          assistantLabel="Reader"
        />
      </View>

      {/* Closing */}
      <AssignmentRow
        assignmentId="prayer_2"
        title="Closing Prayer"
        participant={formatPublisherName(
          assignments.get("prayer_2"),
          "display last",
        )}
      />
    </View>
  );
}

/**
 * PDF Document component for the midweek meeting schedule.
 * Displays all weekly meetings with assignments for the selected month.
 */
export function MidweekSchedulePdfDocument({
  dateRange,
}: MidweekSchedulePdfDocumentProps) {
  const { weeks, isLoading } = useMidweekScheduleData(dateRange);

  if (isLoading) {
    return (
      <Document>
        <PdfPage>
          <SchedulePdfHeader
            scheduleName="Midweek Meeting"
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
            scheduleName="Midweek Meeting"
            monthDate={dateRange.firstMonday}
          />
          <Text style={styles.noData}>
            No meeting data found for the selected month.
          </Text>
        </PdfPage>
      </Document>
    );
  }

  return (
    <Document>
      <PdfPage>
        <SchedulePdfHeader
          scheduleName="Midweek Meeting"
          monthDate={dateRange.firstMonday}
        />
        {weeks.map((week) => (
          <WeekSection key={week.weekId} week={week} />
        ))}
      </PdfPage>
    </Document>
  );
}
