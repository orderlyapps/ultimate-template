import { Accordion } from "@ionic-layout/accordion/Accordion";
import { AccordionContent } from "@ionic-layout/accordion-content/AccordionContent";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Item } from "@ionic-layout/item/Item";
import type { Report } from "@tanstack-db/report/reportSchema";
import { ReportMonthForm } from "../report-month-form/ReportMonthForm";
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
 * - Editable: rendered as an IonAccordion with summary in the header
 *   and the editable form in the content section.
 */
export const ReportMonthItem: React.FC<Props> = ({
  date,
  report,
  canEdit,
  confidentialId,
  groupId,
}) => {
  if (!canEdit) {
    return (
      <Item>
        <ReportMonthSummary date={date} report={report} />
      </Item>
    );
  }

  return (
    <Accordion value={date}>
      <ItemAccordionHeader>
        <ReportMonthSummary date={date} report={report} />
      </ItemAccordionHeader>
      <AccordionContent>
        <ReportMonthForm
          date={date}
          report={report}
          confidentialId={confidentialId}
          groupId={groupId}
        />
      </AccordionContent>
    </Accordion>
  );
};
