import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import type { Report } from "@tanstack-db/report/reportSchema";
import { ReportMonthForm } from "../report-month-form/ReportMonthForm";

interface Props {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal requests dismissal */
  onDismiss: () => void;
  /** The month date string (YYYY-MM-01) */
  date: string;
  /** The existing report for this month, if any */
  report: Report | undefined;
  /** The publisher's confidential_id */
  confidentialId: string;
  /** The publisher's group_id, if known */
  groupId: string | null;
  /**
   * Optional title override. Defaults to the month label derived from `date`,
   * e.g. "March 2026".
   */
  title?: string;
}

/** Formats a date string (YYYY-MM-01) to "Month YYYY". */
const formatMonthLabel = (date: string): string =>
  new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

/**
 * Modal wrapper around `ReportMonthForm` for submitting / editing a single
 * month's report. Auto-dismisses after a successful save.
 */
export const ReportMonthFormModal: React.FC<Props> = ({
  isOpen,
  onDismiss,
  date,
  report,
  confidentialId,
  groupId,
  title,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title ?? formatMonthLabel(date)}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ReportMonthForm
          date={date}
          report={report}
          confidentialId={confidentialId}
          groupId={groupId}
          onSaved={onDismiss}
        />
      </IonContent>
    </IonModal>
  );
};
