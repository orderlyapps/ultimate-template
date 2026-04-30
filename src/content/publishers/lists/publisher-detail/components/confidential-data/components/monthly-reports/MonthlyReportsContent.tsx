import { useParams } from "react-router-dom";
import { IonList } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { Space } from "@layout/space/Space";
import { useConfidentialId } from "@/content/home/tools/group-reports/hooks/useConfidentialId";
import { usePublisherGroupId } from "@/content/home/tools/group-reports/hooks/usePublisherGroupId";
import { useGroupPermissions } from "@services/app/auth/permissions/useGroupPermissions";
import { usePublisherReports24Months } from "./hooks/usePublisherReports24Months";
import { ReportMonthItem } from "./components/report-month-item/ReportMonthItem";

/**
 * Generates an array of month date strings (YYYY-MM-01) for the last 24 months
 * (past months only), in reverse chronological order (newest first).
 */
const generateLast24Months = (): string[] => {
  const dates: string[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  // i=0 is the current month, i=23 is 23 months ago
  for (let i = 0; i < 24; i++) {
    const d = new Date(currentYear, currentMonth - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-indexed
    dates.push(`${year}-${String(month).padStart(2, "0")}-01`);
  }

  return dates;
};

/**
 * Content component for displaying 24 months of publisher reports.
 * Shows read-only view or allows editing based on user permissions.
 */
export const MonthlyReportsContent: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();

  const { confidentialId, isLoading: isLoadingId } =
    useConfidentialId(publisherId);
  const { groupId, isLoading: isLoadingGroup } =
    usePublisherGroupId(publisherId);
  const { canEdit } = useGroupPermissions(groupId ?? "");

  const { data: reports, isLoading: isLoadingReports } =
    usePublisherReports24Months(confidentialId);

  const monthDates = generateLast24Months();

  // Create a lookup map for reports by date
  const reportsByDate = new Map<string, NonNullable<typeof reports>[number]>();
  reports?.forEach((report) => {
    reportsByDate.set(report.date, report);
  });

  if (isLoadingId || isLoadingReports || isLoadingGroup) {
    return (
      <Item className="ion-text-center ion-padding">
        <Text>Loading...</Text>
      </Item>
    );
  }

  if (!confidentialId) {
    return (
      <Item className="ion-text-center ion-padding">
        <Text>
          No Confidential ID found for this publisher. Please request an
          updated Confidential Publisher Data file from your secretary.
        </Text>
      </Item>
    );
  }

  return (
    <IonList>
      <Space height="1" />
      {monthDates.map((date) => (
        <ReportMonthItem
          key={date}
          date={date}
          report={reportsByDate.get(date)}
          canEdit={canEdit}
          confidentialId={confidentialId}
          groupId={groupId}
        />
      ))}
      <Space />
    </IonList>
  );
};
