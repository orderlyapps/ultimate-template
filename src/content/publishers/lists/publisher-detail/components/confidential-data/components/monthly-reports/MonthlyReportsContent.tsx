import { useParams } from "react-router-dom";
import { IonList, IonItemDivider } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { AccordionGroup } from "@ionic-layout/accordion-group/AccordionGroup";
import { Space } from "@layout/space/Space";
import { useConfidentialId } from "@/content/home/tools/group-reports/hooks/useConfidentialId";
import { usePublisherGroupId } from "@/content/home/tools/group-reports/hooks/usePublisherGroupId";
import { useGroupPermissions } from "@services/app/auth/permissions/useGroupPermissions";
import { usePublisherReports24Months } from "./hooks/usePublisherReports24Months";
import { ReportMonthItem } from "./components/report-month-item/ReportMonthItem";

/**
 * Generates an array of month date strings (YYYY-MM-01) starting from the
 * previous month (current month excluded) going back to the second previous
 * September (inclusive), in reverse chronological order (newest first).
 *
 * "Second previous September" = the September before the most recent
 * already-elapsed September. For example, in May 2026 the most recent
 * elapsed September is Sep 2025, so the second previous September is
 * Sep 2024.
 */
const generateReportMonths = (): string[] => {
  const dates: string[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  // Most recent elapsed September: if we're past September this year, it's
  // this year's September; otherwise it's last year's September.
  const lastSeptYear = currentMonth > 8 ? currentYear : currentYear - 1;
  // Second previous September is the year before that.
  const endYear = lastSeptYear - 1;
  const endMonth = 8; // September (0-indexed)

  // Start from the previous month (skip the current month per requirement).
  const start = new Date(currentYear, currentMonth - 1, 1);
  const end = new Date(endYear, endMonth, 1);

  const cursor = new Date(start);
  while (cursor >= end) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1; // 1-indexed
    dates.push(`${year}-${String(month).padStart(2, "0")}-01`);
    cursor.setMonth(cursor.getMonth() - 1);
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

  const monthDates = generateReportMonths();

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

  // Build the rendered list, inserting a year header before each January.
  // Iterating reverse-chronologically, when we encounter a January we render
  // the year header (for the year that January belongs to) before the item.
  const items: React.ReactNode[] = [];
  monthDates.forEach((date) => {
    const [yearStr, monthStr] = date.split("-");
    if (monthStr === "12") {
      items.push(
        <IonItemDivider key={`year-${yearStr}`} sticky className="ion-margin ion-padding-vertical">
          <Text size="lg">{yearStr}</Text>
        </IonItemDivider>,
      );
    }
    items.push(
      <ReportMonthItem
        key={date}
        date={date}
        report={reportsByDate.get(date)}
        canEdit={canEdit}
        confidentialId={confidentialId}
        groupId={groupId}
      />,
    );
  });

  return (
    <IonList>
      <Space height="1" />
      {canEdit ? <AccordionGroup>{items}</AccordionGroup> : items}
      <Space />
    </IonList>
  );
};
