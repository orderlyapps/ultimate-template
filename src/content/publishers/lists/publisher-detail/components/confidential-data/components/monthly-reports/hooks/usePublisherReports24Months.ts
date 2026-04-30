import { useLiveQuery, eq, and, inArray } from "@tanstack/react-db";
import { reportCollection } from "@tanstack-db/report/reportCollection";

/**
 * Generates an array of month date strings (YYYY-MM-01) for the last 24 months
 * (past months only), starting from the current month going back.
 */
const generateLast24Months = (): string[] => {
  const dates: string[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  for (let i = 0; i < 24; i++) {
    const d = new Date(currentYear, currentMonth - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-indexed
    dates.push(`${year}-${String(month).padStart(2, "0")}-01`);
  }

  return dates;
};

/**
 * Hook to fetch reports for the last 24 months for a given confidential_id.
 * Returns reports sorted by date (oldest first).
 *
 * @param confidentialId - The publisher's confidential_id
 */
export const usePublisherReports24Months = (
  confidentialId: string | undefined,
) => {
  const monthDates = generateLast24Months();

  return useLiveQuery(
    (q) => {
      if (!confidentialId) return undefined;

      return q
        .from({ r: reportCollection })
        .where(({ r }) =>
          and(
            eq(r.confidential_id, confidentialId),
            inArray(r.date, monthDates),
          ),
        );
    },
    [confidentialId],
  );
};
