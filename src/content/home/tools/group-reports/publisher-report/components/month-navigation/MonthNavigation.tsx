import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { addMonths } from "date-fns/addMonths";
import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import backIcon from "@icons/chevronBackJW.svg";
import forwardIcon from "@icons/chevronForwardJW.svg";
import { Text } from "@ionic-display/text/Text";

type Props = {
  /** Current report date in YYYY-MM-DD format (always first of month). */
  date: string;
  /** Human-readable label for the current month, e.g. "March 2025". */
  monthLabel: string;
};

/**
 * Returns the first day of the most recent completed month (i.e. the previous
 * month relative to today) as a YYYY-MM-DD string.
 */
const getMostRecentReportableMonth = (): string => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}-${String(month).padStart(2, "0")}-01`;
};

/**
 * Top-of-page navigation that lets the user step backward or forward through
 * monthly publisher reports by updating the `?date=` query string.
 * The forward button is disabled once the user reaches the most recent
 * reportable month (last completed month) since future reports do not exist.
 */
export const MonthNavigation: React.FC<Props> = ({ date, monthLabel }) => {
  const history = useHistory();
  const location = useLocation();

  const currentDate = parseISO(date);
  const maxDate = parseISO(getMostRecentReportableMonth());
  const canGoForward = currentDate < maxDate;

  /** Navigate to the report for the given month, preserving the current path. */
  const navigateToMonth = (offset: number) => {
    const newDate = format(addMonths(currentDate, offset), "yyyy-MM-01");
    const params = new URLSearchParams(location.search);
    params.set("date", newDate);
    history.replace({
      pathname: location.pathname,
      search: `?${params.toString()}`,
    });
  };

  return (
    <IonGrid>
      <IonRow className="ion-align-items-center">
        <IonCol size="auto">
          <IonButton fill="clear" onClick={() => navigateToMonth(-1)}>
            <IonIcon src={backIcon} slot="icon-only" size="large" />
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center">
          <Text color="primary" bold>
            {monthLabel}
          </Text>
        </IonCol>
        <IonCol size="auto">
          <IonButton
            fill="clear"
            disabled={!canGoForward}
            onClick={() => navigateToMonth(1)}
          >
            <IonIcon src={forwardIcon} slot="icon-only" size="large" />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
