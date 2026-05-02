import { useState } from "react";
import { Item } from "@ionic-layout/item/Item";
import type { Report } from "@tanstack-db/report/reportSchema";
import { ReportMonthFormModal } from "../report-month-form-modal/ReportMonthFormModal";
import { ReportMonthSummary } from "../report-month-summary/ReportMonthSummary";

interface Props {
  /** The month date string (YYYY-MM-01) */
  date: string;
  /** The existing report for this month, if any */
  report: Report | undefined;
  /** Whether the user can edit this report */
  canEdit: boolean;
  /** The publisher's confidential_id */
  confidentialId: string;
  /** The publisher's group_id, if known */
  groupId: string | null;
}

/**
 * Displays a single month's report.
 * - Read-only: rendered as a plain IonItem with the summary.
 * - Editable: rendered as a tappable IonItem that opens a modal containing
 *   the editable report form.
 */
export const ReportMonthItem: React.FC<Props> = ({
  date,
  report,
  canEdit,
  confidentialId,
  groupId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!canEdit) {
    return (
      <Item>
        <ReportMonthSummary date={date} report={report} />
      </Item>
    );
  }

  return (
    <>
      <Item button detail onClick={() => setIsOpen(true)}>
        <ReportMonthSummary date={date} report={report} />
      </Item>
      <ReportMonthFormModal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        date={date}
        report={report}
        confidentialId={confidentialId}
        groupId={groupId}
      />
    </>
  );
};
