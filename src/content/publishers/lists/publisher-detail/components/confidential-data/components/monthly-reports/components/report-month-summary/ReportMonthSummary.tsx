import { Text } from "@ionic-display/text/Text";
import { Col } from "@ionic-layout/col/Col";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { IonIcon } from "@ionic/react";
import type { Report } from "@tanstack-db/report/reportSchema";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  removeCircleOutline,
} from "ionicons/icons";

interface Props {
  /** The month date string (YYYY-MM-01) */
  date: string;
  /** The existing report for this month, if any */
  report: Report | undefined;
}

/**
 * Formats a date string (YYYY-MM-01) to a human-readable month label.
 * Example: "2024-01-01" -> "January 2024"
 */
const formatMonthLabel = (date: string): string => {
  return new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
  });
};

/**
 * Displays a single month's report summary (label + status + comments).
 * Rendered inside an IonItem (read-only) or an accordion header (editable).
 */
export const ReportMonthSummary: React.FC<Props> = ({ date, report }) => {
  const monthLabel = formatMonthLabel(date);

  return (
    <Grid>
      <Row>
        <Col size="6">
          <Text color="primary">{monthLabel}</Text>
        </Col>

        <Col size="2">
          {report?.hours && (
            <Text size="sm" bold>
              {report?.hours}
            </Text>
          )}
        </Col>

        <Col size="2">
          {report?.bible_studies && (
            <Text size="sm" bold>
              {report?.bible_studies}
            </Text>
          )}
        </Col>

        <Col className="ion-text-end" size="auto">
          {!report ? (
            <IonIcon icon={removeCircleOutline} color="medium"></IonIcon>
          ) : report.active ? (
            <IonIcon icon={checkmarkCircleOutline} color="success"></IonIcon>
          ) : (
            <IonIcon icon={closeCircleOutline} color="danger"></IonIcon>
          )}
        </Col>
      </Row>
      {report?.comments && (
        <Row>
          <Col>
            <Text size="xs" color="medium" style={{ marginTop: "2px" }}>
              {report.comments}
            </Text>
          </Col>
        </Row>
      )}
    </Grid>
  );
};
