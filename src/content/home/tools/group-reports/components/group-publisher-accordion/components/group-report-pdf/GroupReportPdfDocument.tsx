import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PdfPage } from "@services/vendor/pdf/pdf-page";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

const BORDER = "1pt solid #333";
const ROW_HEIGHT = 22;

const styles = StyleSheet.create({
  groupHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  monthLabel: {
    fontSize: 11,
    color: "#444",
    marginBottom: 8,
  },
  table: {
    border: BORDER,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderBottom: BORDER,
    minHeight: 20,
  },
  row: {
    flexDirection: "row",
    borderBottom: BORDER,
    minHeight: ROW_HEIGHT,
  },
  lastRow: {
    flexDirection: "row",
    minHeight: ROW_HEIGHT,
  },
  cell: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 9,
    justifyContent: "center",
    borderRight: BORDER,
  },
  cellLast: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    fontSize: 9,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  /** Column widths sum to 100% */
  colName: { width: "21%" },
  colParticipated: { width: "8%" },
  colHours: { width: "8%" },
  colStudies: { width: "8%" },
  colComments: { width: "55%" },
});

type Props = {
  /** The group whose publishers are listed in the form */
  groupName: string;
  /** Human-readable month label, e.g. "March 2025" */
  monthLabel: string;
  /** Publishers belonging to the group */
  publishers: Publisher[];
};

/**
 * Printable, fillable PDF spreadsheet listing each publisher in a group as a
 * single row with empty cells for "Participated", "Hours", "Bible Studies",
 * and "Comments" so the group overseer can collect report data on paper.
 */
export const GroupReportPdfDocument: React.FC<Props> = ({
  groupName,
  monthLabel,
  publishers,
}) => {
  return (
    <Document>
      <PdfPage>
        <Text style={styles.groupHeading}>
          {groupName} — Field Service Reports
        </Text>
        <Text style={styles.monthLabel}>{monthLabel}</Text>
        <View style={styles.table}>
          <View style={styles.headerRow} fixed>
            <View style={[styles.cell, styles.colName]}>
              <Text style={styles.headerText}>Publisher</Text>
            </View>
            <View style={[styles.cell, styles.colParticipated]}>
              <Text style={styles.headerText}>Active</Text>
            </View>
            <View style={[styles.cell, styles.colHours]}>
              <Text style={styles.headerText}>Hours</Text>
            </View>
            <View style={[styles.cell, styles.colStudies]}>
              <Text style={styles.headerText}>Studies</Text>
            </View>
            <View style={[styles.cellLast, styles.colComments]}>
              <Text style={styles.headerText}>Comments</Text>
            </View>
          </View>
          {publishers.map((publisher, idx) => {
            const isLast = idx === publishers.length - 1;
            const rowStyle = isLast ? styles.lastRow : styles.row;
            return (
              <View key={publisher.id} style={rowStyle} wrap={false}>
                <View style={[styles.cell, styles.colName]}>
                  <Text>{formatPublisherName(publisher)}</Text>
                </View>
                <View style={[styles.cell, styles.colParticipated]} />
                <View style={[styles.cell, styles.colHours]} />
                <View style={[styles.cell, styles.colStudies]} />
                <View style={[styles.cellLast, styles.colComments]} />
              </View>
            );
          })}
        </View>
      </PdfPage>
    </Document>
  );
};
