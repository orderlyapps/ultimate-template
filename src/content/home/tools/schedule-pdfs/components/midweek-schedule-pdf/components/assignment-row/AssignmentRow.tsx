import { JW_BROWN, JW_RED, JW_SLATE } from "@colors/colors";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 0.5,
  },
  title: {
    width: "50%",
  },
  participant: {
    width: "20%",
    textAlign: "right",
  },
  assistant: {
    width: "20%",
    color: "#777",
  },
  assistantLabel: {
    width: "10%",
    textAlign: "right",
    color: "#777",
    paddingRight: 5,
  },
  // Color variations for assignment types
  slate: {
    color: JW_SLATE.light.base, // slate-600
  },
  brown: {
    color: JW_BROWN.light.base, // amber-800 (brown)
  },
  red: {
    color: JW_RED.light.base, // red-600
  },
  grey: {
    color: "#6b7280", // gray-500
  },
});

type AssignmentRowProps = {
  /** The assignment ID used to determine color (e.g., "tgw_talk", "ayf_part1", "lc_part1") */
  readonly assignmentId: string;
  /** The assignment title with timing (e.g., "Talk (10 min)") */
  readonly title: string;
  /** The participant/publisher name */
  readonly participant: string;
  /** Optional assistant or reader name */
  readonly assistantOrReader?: string;
  /** Label for the assistant/reader (e.g., "Assistant", "Reader") */
  readonly assistantLabel?: string;
  /** Whether to always show the assistant label (used for second school parts) */
  readonly showAssistantLabel?: boolean;
};

/**
 * Gets the color style based on the assignment ID.
 * - Contains "tgw" → slate
 * - Contains "ayf" → brown
 * - Contains "lc" → red
 * - Otherwise → grey
 */
function getColorStyle(assignmentId: string): typeof styles.slate {
  if (assignmentId.includes("tgw")) {
    return styles.slate;
  }
  if (assignmentId.includes("ayf")) {
    return styles.brown;
  }
  if (assignmentId.includes("lc")) {
    return styles.red;
  }
  return styles.grey;
}

/**
 * Reusable assignment row component for the midweek schedule PDF.
 * Displays the assignment title (with color coding), optional assistant/reader,
 * and the participant name.
 *
 * @example
 * ```tsx
 * <AssignmentRow
 *   assignmentId="tgw_talk"
 *   title="Talk (10 min)"
 *   participant="John Smith"
 * />
 * <AssignmentRow
 *   assignmentId="ayf_part1"
 *   title="Demonstration (5 min)"
 *   participant="Jane Doe"
 *   assistantOrReader="Bob Wilson"
 *   assistantLabel="Assistant"
 * />
 * ```
 */
export function AssignmentRow({
  assignmentId,
  title,
  participant,
  assistantOrReader,
  assistantLabel = "Assistants",
  showAssistantLabel = false,
}: AssignmentRowProps) {
  const colorStyle = getColorStyle(assignmentId);

  // Show the assistant label for specific assignment types or when explicitly requested
  const shouldShowLabel =
    showAssistantLabel ||
    assignmentId === "ayf_part1" ||
    assignmentId === "lc_cbs";

  return (
    <View style={styles.row}>
      <Text style={[styles.title, colorStyle]}>{title}</Text>
      <Text style={styles.assistantLabel}>
        {shouldShowLabel &&
          assistantOrReader && (
            <Text style={styles.assistant}>{assistantLabel}:</Text>
          )}
      </Text>
      <Text style={styles.assistant}>
        {assistantOrReader && (
          <Text style={styles.assistant}>{assistantOrReader}</Text>
        )}
      </Text>
      <Text style={styles.participant}>{participant}</Text>
    </View>
  );
}
