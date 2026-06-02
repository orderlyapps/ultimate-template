import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { AssignmentRow } from "../assignment-row/AssignmentRow";
import { formatPublisherName } from "@format/formatPublisherName";
import type { WeekScheduleData } from "../../hooks/useMidweekScheduleData";

const styles = StyleSheet.create({
  heading: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 2,
    color: "#666",
  },
  section: {
    marginBottom: 10,
  },
});

type SecondSchoolSectionProps = {
  readonly week: WeekScheduleData;
};

/**
 * Renders the second school assignments section for a week.
 * Only rendered when chairman_2 (Counselor) assignment exists,
 * indicating that second school is active for that week.
 */
export function SecondSchoolSection({ week }: SecondSchoolSectionProps) {
  const { meetingData, assignments } = week;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Second School</Text>

      {/* Counselor (chairman_2) */}
      <AssignmentRow
        assignmentId="chairman_2"
        title="Counselor"
        participant={formatPublisherName(
          assignments.get("chairman_2"),
          "display last",
        )}
      />

      {/* Bible Reading */}
      <AssignmentRow
        assignmentId="tgw_bread"
        title={meetingData.mwb_tgw_bread_title ?? "Bible Reading"}
        participant={formatPublisherName(
          assignments.get("school_2_bible_reading"),
          "display last",
        )}
      />

      {/* Apply Yourself parts (same meeting data titles, school_2 assignments) */}
      {meetingData.mwb_ayf_part1 && (
        <AssignmentRow
          assignmentId="ayf_part1"
          title={`${meetingData.mwb_ayf_part1_title ?? meetingData.mwb_ayf_part1}${meetingData.mwb_ayf_part1_time ? ` (${meetingData.mwb_ayf_part1_time} min)` : ""}`}
          participant={formatPublisherName(
            assignments.get("school_2_apply_1"),
            "display last",
          )}
          assistantOrReader={formatPublisherName(
            assignments.get("school_2_assistant_1"),
            "display last",
          )}
          assistantLabel="Assistant"
          showAssistantLabel
        />
      )}
      {meetingData.mwb_ayf_part2 && (
        <AssignmentRow
          assignmentId="ayf_part2"
          title={`${meetingData.mwb_ayf_part2_title ?? meetingData.mwb_ayf_part2}${meetingData.mwb_ayf_part2_time ? ` (${meetingData.mwb_ayf_part2_time} min)` : ""}`}
          participant={formatPublisherName(
            assignments.get("school_2_apply_2"),
            "display last",
          )}
          assistantOrReader={formatPublisherName(
            assignments.get("school_2_assistant_2"),
            "display last",
          )}
          assistantLabel="Assistant"
          showAssistantLabel
        />
      )}
      {meetingData.mwb_ayf_part3 && (
        <AssignmentRow
          assignmentId="ayf_part3"
          title={`${meetingData.mwb_ayf_part3_title ?? meetingData.mwb_ayf_part3}${meetingData.mwb_ayf_part3_time ? ` (${meetingData.mwb_ayf_part3_time} min)` : ""}`}
          participant={formatPublisherName(
            assignments.get("school_2_apply_3"),
            "display last",
          )}
          assistantOrReader={formatPublisherName(
            assignments.get("school_2_assistant_3"),
            "display last",
          )}
          assistantLabel="Assistant"
          showAssistantLabel
        />
      )}
      {meetingData.mwb_ayf_part4 && (
        <AssignmentRow
          assignmentId="ayf_part4"
          title={`${meetingData.mwb_ayf_part4_title ?? meetingData.mwb_ayf_part4}${meetingData.mwb_ayf_part4_time ? ` (${meetingData.mwb_ayf_part4_time} min)` : ""}`}
          participant={formatPublisherName(
            assignments.get("school_2_apply_4"),
            "display last",
          )}
          assistantOrReader={formatPublisherName(
            assignments.get("school_2_assistant_4"),
            "display last",
          )}
          assistantLabel="Assistant"
          showAssistantLabel
        />
      )}
    </View>
  );
}
