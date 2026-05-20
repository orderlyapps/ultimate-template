import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PdfPage } from "@services/vendor/pdf/pdf-page";

const styles = StyleSheet.create({
  keyValueRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottom: "0.5pt solid #ddd",
  },
  labelCol: {
    width: "30%",
    paddingRight: 10,
  },
  valueCol: {
    width: "70%",
  },
  labelText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    fontSize: 11,
    color: "#333",
  },
  emptyText: {
    fontSize: 11,
    color: "#999",
    fontStyle: "italic",
  },
});

type AssignmentData = {
  date: string;
  school: string;
  student: string;
  assistant?: string;
  counselor: string;
  assignment: string | number | null | undefined;
  material: string | number | null | undefined;
};

type Props = {
  data: AssignmentData;
};

function KeyValueRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <View style={styles.keyValueRow}>
      <View style={styles.labelCol}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.valueCol}>
        {value ? (
          <Text style={styles.valueText}>{value}</Text>
        ) : (
          <Text style={styles.emptyText}>—</Text>
        )}
      </View>
    </View>
  );
}

/**
 * PDF Document component for a single student assignment form.
 * Displays one student's assignment details in a printable format.
 */
export function StudentAssignmentPdfDocument({ data }: Props) {
  return (
    <Document>
      <PdfPage
        title="Our Christian Life & Ministry Meeting Assignment"
        size={"A6"}
        orientation="landscape"
      >
        <KeyValueRow label="Date:" value={data.date} />
        <KeyValueRow label="Student:" value={data.student} />
        {data.assistant && (
          <KeyValueRow label="Assistant:" value={data.assistant} />
        )}
        <KeyValueRow label="School:" value={data.school} />
        <KeyValueRow label="Counselor:" value={data.counselor} />
        <KeyValueRow label="Assignment:" value={data.assignment} />
        <KeyValueRow label="Material:" value={data.material} />
      </PdfPage>
    </Document>
  );
}
