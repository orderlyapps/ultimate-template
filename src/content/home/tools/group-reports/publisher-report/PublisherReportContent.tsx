import { useParams, useLocation, useHistory } from "react-router-dom";
import { Text } from "@ionic-display/text/Text";
import { useConfidentialId } from "../hooks/useConfidentialId";
import { usePublisherReport } from "../hooks/usePublisherReport";
import { usePublisherGroupId } from "../hooks/usePublisherGroupId";
import { useGroupPermissions } from "@services/app/auth/permissions/useGroupPermissions";
import { ReportForm } from "./components/report-form/ReportForm";
import { ReportReadOnly } from "./components/report-read-only/ReportReadOnly";
import { MonthNavigation } from "./components/month-navigation/MonthNavigation";
import { Item } from "@ionic-layout/item/Item";

/**
 * Content component for the publisher report page.
 * Shows an editable form for users with can_edit, a read-only view for can_read only.
 */
export const PublisherReportContent: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const location = useLocation();
  const history = useHistory();

  /** Extract date from query string, fall back to previous month using local time */
  const date =
    new URLSearchParams(location.search).get("date") ??
    (() => {
      const now = new Date();
      const year =
        now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const month = now.getMonth() === 0 ? 12 : now.getMonth();
      return `${year}-${String(month).padStart(2, "0")}-01`;
    })();

  const { confidentialId, isLoading: isLoadingId } =
    useConfidentialId(publisherId);
  const { groupId, isLoading: isLoadingGroup } =
    usePublisherGroupId(publisherId);
  const { canEdit } = useGroupPermissions(groupId ?? "");

  const { data: reports, isLoading: isLoadingReport } = usePublisherReport(
    confidentialId,
    date,
  );

  const existingReport = reports?.[0];

  /** Format date as human-readable month label, e.g. "March 2025" */
  const monthLabel = new Date(date + "T00:00:00").toLocaleDateString(
    undefined,
    { month: "long", year: "numeric" },
  );

  if (isLoadingId || isLoadingReport || isLoadingGroup) {
    return <Text>Loading...</Text>;
  }

  if (!confidentialId) {
    return (
      <Item className="ion-text-center ion-padding ion-margin">
        <Text>
          No Confidential ID found for this publisher. Please request an updated
          Confidential Publisher Data file from your secretary.
        </Text>
      </Item>
    );
  }

  return (
    <>
      <MonthNavigation date={date} monthLabel={monthLabel} />
      {canEdit ? (
        <ReportForm
          key={date}
          confidentialId={confidentialId}
          groupId={groupId}
          date={date}
          existingReport={existingReport}
          onSave={() => history.goBack()}
        />
      ) : (
        <ReportReadOnly report={existingReport} />
      )}
    </>
  );
};
