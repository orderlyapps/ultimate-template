import { useLiveQuery, eq, and } from "@tanstack/react-db";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import { useConfidentialId } from "./useConfidentialId";

/**
 * Hook to fetch a single publisher's report for a given month.
 *
 * Resolves the publisher's confidential_id from the local collection,
 * then queries the report collection for the matching (confidential_id, date) row.
 *
 * @param publisherId - The publisher's public UUID
 * @param date - The first day of the month as `YYYY-MM-DD`
 * @returns The report (if any), the resolved confidentialId, and a loading flag.
 */
export const usePublisherReportForMonth = (
  publisherId: string | undefined,
  date: string | undefined,
) => {
  const { confidentialId, isLoading: isLoadingId } =
    useConfidentialId(publisherId);

  const { data, isLoading: isLoadingReport } = useLiveQuery(
    (q) => {
      if (!confidentialId || !date) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) =>
          and(eq(r.confidential_id, confidentialId), eq(r.date, date)),
        );
    },
    [confidentialId, date],
  );

  return {
    confidentialId,
    report: data?.[0],
    isLoading: isLoadingId || isLoadingReport,
  };
};
