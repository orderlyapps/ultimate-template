import { useLiveQuery, eq, and } from "@tanstack/react-db";
import { reportCollection } from "@tanstack-db/report/reportCollection";

/**
 * Returns the report for a given publisher (by confidential_id) and month date string.
 * @param confidentialId - The publisher's confidential_id
 * @param date - First day of the month as "yyyy-mm-dd"
 */
export const usePublisherReport = (
  confidentialId: string | undefined,
  date: string,
) => {
  return useLiveQuery(
    (q) => {
      if (!confidentialId) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) =>
          and(eq(r.confidential_id, confidentialId), eq(r.date, date)),
        );
    },
    [confidentialId, date],
  );
};
