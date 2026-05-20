import { PdfDownloadButton } from "@services/vendor/pdf/pdf-download-button";
import { StudentAssignmentPdfDocument } from "../student-assignment-pdf/StudentAssignmentPdfDocument";
import { formatPublisherName } from "@format/formatPublisherName";

/** Publisher type with optional fields as returned by the database query */
type PublisherFromQuery = {
  id?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string | null;
  [key: string]: unknown;
} | undefined;

/**
 * Safely formats a publisher name from query data that may have optional fields.
 * Returns empty string if publisher is undefined or missing required fields.
 */
function safeFormatPublisherName(publisher: PublisherFromQuery): string {
  if (!publisher || !publisher.first_name || !publisher.last_name) {
    return "";
  }
  return formatPublisherName(
    publisher as { first_name: string; last_name: string; display_name?: string | null },
    "display last"
  );
}

type Props = {
  /** Date string for the assignment (week label) */
  date: string;
  /** School name (e.g., "Main Hall", "Second School") */
  school: string;
  /** The assigned student */
  student: PublisherFromQuery;
  /** The assigned assistant (if any) */
  assistant: PublisherFromQuery;
  /** The counselor/chairman */
  counselor: PublisherFromQuery;
  /** The assignment title */
  assignment: string | number | null | undefined;
  /** The assignment material/source */
  material: string | number | null | undefined;
  /** Filename for the downloaded PDF (without extension) */
  filename: string;
};

/**
 * Renders a button that downloads a printable PDF for a single student assignment.
 * Used next to each student part in the CLAM Assignment Forms tool.
 */
export function StudentAssignmentPdfDownloadButton({
  date,
  school,
  student,
  assistant,
  counselor,
  assignment,
  material,
  filename,
}: Props) {
  const data = {
    date,
    school,
    student: safeFormatPublisherName(student),
    assistant: assistant ? safeFormatPublisherName(assistant) : undefined,
    counselor: safeFormatPublisherName(counselor),
    assignment,
    material,
  };

  return (
    <PdfDownloadButton
      fill="clear"
      size="small"
      document={<StudentAssignmentPdfDocument data={data} />}
      filename={filename}
    >
      PDF
    </PdfDownloadButton>
  );
}
