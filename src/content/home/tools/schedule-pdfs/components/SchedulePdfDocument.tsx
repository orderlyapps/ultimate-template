import { Document, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { SchedulePdfHeader } from "./schedule-pdf-header/SchedulePdfHeader";
import { MidweekSchedulePdfDocument } from "./midweek-schedule-pdf/MidweekSchedulePdfDocument";
import { AudioVideoPdfDocument } from "./audio-video-pdf/AudioVideoPdfDocument";
import { CleaningSchedulePdfDocument } from "./cleaning-schedule-pdf/CleaningSchedulePdfDocument";
import { PdfPage } from "@services/vendor/pdf/pdf-page";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
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
  // Render the specialized midweek schedule PDF for midweek meetings
  if (title === "Midweek Meeting") {
    return <MidweekSchedulePdfDocument dateRange={dateRange} />;
  }

  // Render the audio/video schedule PDF for audio-video
  if (title === "Audio Video") {
    return <AudioVideoPdfDocument dateRange={dateRange} />;
  }

  // Render the cleaning schedule PDF for cleaning
  if (title === "Cleaning") {
    return <CleaningSchedulePdfDocument dateRange={dateRange} />;
  }

  const firstDate = format(new Date(dateRange.firstMonday), "MMMM d, yyyy");
  const lastDate = format(new Date(dateRange.lastMonday), "MMMM d, yyyy");

  return (
    <Document>
      <PdfPage>
        <SchedulePdfHeader
          scheduleName={title}
          monthDate={dateRange.firstMonday}
        />

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
      </PdfPage>
    </Document>
  );
};
