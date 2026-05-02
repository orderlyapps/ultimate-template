import { useLiveQuery, eq, and, inArray } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

/**
 * Returns the number of publishers in the provided list that do NOT have a
 * report submitted for the given `reportDate` month.
 *
 * Resolves each publisher's `confidential_id` from the local collection,
 * then checks the report collection for matching `(confidential_id, date)`
 * rows. Publishers whose `confidential_id` cannot be resolved are treated
 * as missing a report.
 *
 * @param publishers - Publishers to check (e.g. all publishers in a group)
 * @param reportDate - First day of the report month as `YYYY-MM-DD`
 */
export const useMissingReportCount = (
  publishers: Publisher[] | undefined,
  reportDate: string | undefined,
) => {
  const publisherIds = publishers?.map((p) => p.id) ?? [];

  /** Local publisher rows mapping publisher_id -> confidential_id */
  const { data: localRows } = useLiveQuery(
    (q) => {
      if (publisherIds.length === 0) return undefined;
      return q
        .from({ pl: publisherLocalCollection })
        .where(({ pl }) => inArray(pl.publisher_id, publisherIds));
    },
    [publisherIds.join(",")],
  );

  const confidentialIds = (localRows ?? [])
    .map((row) => row.confidential_id as string | undefined)
    .filter((id): id is string => Boolean(id));

  /** Reports submitted for this month by any of the group's publishers */
  const { data: reports } = useLiveQuery(
    (q) => {
      if (!reportDate || confidentialIds.length === 0) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) =>
          and(
            eq(r.date, reportDate),
            inArray(r.confidential_id, confidentialIds),
          ),
        );
    },
    [reportDate, confidentialIds.join(",")],
  );

  const submittedIds = new Set(
    (reports ?? []).map((r) => r.confidential_id as string),
  );

  const total = publishers?.length ?? 0;
  /** Publishers with a resolved confidential_id AND a report for the month */
  const submittedCount = (localRows ?? []).reduce((count, row) => {
    const id = row.confidential_id as string | undefined;
    return id && submittedIds.has(id) ? count + 1 : count;
  }, 0);

  return total - submittedCount;
};
