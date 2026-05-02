import { Item } from "@ionic-layout/item/Item";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { ReportMonthSummary } from "@/content/publishers/lists/publisher-detail/components/confidential-data/components/monthly-reports/components/report-month-summary/ReportMonthSummary";
import { usePublisherReportForMonth } from "../../../../hooks/usePublisherReportForMonth";

type Props = {
  /** The publisher whose report to display */
  publisher: Publisher;
  /** First day of the report month as `YYYY-MM-DD` */
  reportDate: string;
};

/**
 * Renders a tappable list item for a single publisher's monthly report.
 * Reuses `ReportMonthSummary` so the visual matches the publisher detail
 * monthly reports view, but shows the publisher's name as the label
 * instead of the month.
 */
export const PublisherReportItem: React.FC<Props> = ({
  publisher,
  reportDate,
}) => {
  const { report } = usePublisherReportForMonth(publisher.id, reportDate);

  return (
    <Item
      detail
      button
      routerLink={`/home/group-reports/${publisher.id}?date=${reportDate}`}
    >
      <ReportMonthSummary
        date={reportDate}
        report={report}
        label={formatPublisherName(publisher)}
      />
    </Item>
  );
};
