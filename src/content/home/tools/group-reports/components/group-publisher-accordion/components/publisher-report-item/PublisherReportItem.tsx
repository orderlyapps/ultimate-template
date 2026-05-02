import { useState } from "react";
import { Item } from "@ionic-layout/item/Item";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { ReportMonthSummary } from "@/content/publishers/lists/publisher-detail/components/confidential-data/components/monthly-reports/components/report-month-summary/ReportMonthSummary";
import { ReportMonthFormModal } from "@/content/publishers/lists/publisher-detail/components/confidential-data/components/monthly-reports/components/report-month-form-modal/ReportMonthFormModal";
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
  const { report, confidentialId } = usePublisherReportForMonth(
    publisher.id,
    reportDate,
  );
  const [isOpen, setIsOpen] = useState(false);

  const publisherName = formatPublisherName(publisher);

  return (
    <>
      <Item
        detail
        button
        disabled={!confidentialId}
        onClick={() => setIsOpen(true)}
      >
        <ReportMonthSummary
          date={reportDate}
          report={report}
          label={publisherName}
        />
      </Item>
      {confidentialId && (
        <ReportMonthFormModal
          isOpen={isOpen}
          onDismiss={() => setIsOpen(false)}
          date={reportDate}
          report={report}
          confidentialId={confidentialId}
          groupId={publisher.group_id ?? null}
          title={publisherName}
        />
      )}
    </>
  );
};
