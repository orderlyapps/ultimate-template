import { PdfDownloadButton } from "@services/vendor/pdf/pdf-download-button";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { GroupReportPdfDocument } from "../group-report-pdf/GroupReportPdfDocument";

type Props = {
  /** Group name used in the PDF heading and filename */
  groupName: string;
  /** Human-readable month label, e.g. "March 2025" */
  monthLabel: string;
  /** First day of the report month as "yyyy-mm-dd" (used for filename) */
  reportDate: string;
  /** Publishers belonging to the group */
  publishers: Publisher[];
};

/**
 * Renders an outlined block button that downloads a printable, fillable PDF
 * form containing one row per publisher in the group. Used at the top of the
 * group accordion's publisher list.
 */
export const GroupReportPdfDownloadButton: React.FC<Props> = ({
  groupName,
  monthLabel,
  reportDate,
  publishers,
}) => {
  const safeName = groupName.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="ion-padding ion-margin">
      <PdfDownloadButton
        expand="block"
        fill="outline"
        document={
          <GroupReportPdfDocument
            groupName={groupName}
            monthLabel={monthLabel}
            publishers={publishers}
          />
        }
        filename={`${safeName}-${reportDate}-report-form`}
      >
        Download Report Form (PDF)
      </PdfDownloadButton>
    </div>
  );
};
