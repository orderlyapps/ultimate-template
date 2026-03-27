import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2pt solid #333",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: "1pt solid #eee",
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  value: {
    width: "70%",
  },
});

type SchedulePdfDocumentProps = {
  readonly title: string;
  readonly dateRange: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  };
};

export const SchedulePdfDocument: React.FC<SchedulePdfDocumentProps> = ({
  title,
  dateRange,
}) => {
  const firstDate = format(new Date(dateRange.firstMonday), "MMMM d, yyyy");
  const lastDate = format(new Date(dateRange.lastMonday), "MMMM d, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {firstDate} - {lastDate}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Schedule Type:</Text>
            <Text style={styles.value}>{title}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>{firstDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>{lastDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>Ready for assignment</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
