import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import { cleanMajorCollection } from "@tanstack-db/clean_major/cleanMajorCollection";
import { cleanMinorCollection } from "@tanstack-db/clean_minor/cleanMinorCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { getUserPublisher } from "@feature/db/publisher/user-publisher/get-user-publisher/getUserPublisher";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { assignmentLabels } from "@/content/home/content/home-accordions/components/notifications-content/helper/assignmentLabels";

/** A single assignment item for display in the assignments accordion */
export type AssignmentItem = {
  key: string;
  /** e.g. "Midweek Assignment", "Weekend Assignment" */
  title: string;
  /** e.g. "This Week", "Next Week", or "April 14–20" */
  dateLabel: string;
  /** ISO week_id used for sorting */
  sortDate: string;
  /** Numeric sort priority within the same week */
  sortOrder: number;
  /** Individual assignment labels for this grouped item */
  details: string[];
};

/**
 * Fetches all upcoming assignments for the current user publisher across
 * midweek, weekend, AV, speaker, and cleaning collections.
 * Returns a sorted array of AssignmentItem grouped by week and type.
 */
export function usePublisherAssignments(): {
  assignments: AssignmentItem[];
  isLoading: boolean;
} {
  const publisher = getUserPublisher();
  const publisherId = publisher?.id ?? "";
  const congregationId = getUserCongregation()?.id;
  const thisWeekId = getThisWeekID();

  // Resolve the publisher's group_id for cleaning assignments
  const { data: livePublisher } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.id, publisherId)),
    [publisherId],
  );

  const groupId = livePublisher?.[0]?.group_id ?? "";

  // --- Midweek assignments (participant-based) ---
  const { data: midweekAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ ma: midweekAssignmentCollection })
        .where(({ ma }) =>
          and(
            eq(ma.participant_id, publisherId),
            eq(ma.congregation_id, congregationId),
            gte(ma.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  // --- Weekend assignments (participant-based) ---
  const { data: weekendAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ wa: weekendAssignmentCollection })
        .where(({ wa }) =>
          and(
            eq(wa.participant_id, publisherId),
            eq(wa.congregation_id, congregationId),
            gte(wa.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  // --- AV assignments (participant-based, covers both midweek and weekend) ---
  const { data: avAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .where(({ av }) =>
          and(
            eq(av.participant_id, publisherId),
            eq(av.congregation_id, congregationId),
            gte(av.week_id, thisWeekId),
          ),
        ),
    [publisherId, congregationId, thisWeekId],
  );

  // --- Speaker assignments (speaker_id based, join congregation for name) ---
  const { data: speakerAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .join({ c: congregationCollection }, ({ sa, c }) =>
          eq(sa.congregation_id, c.id),
        )
        .where(({ sa }) =>
          and(eq(sa.speaker_id, publisherId), gte(sa.week_id, thisWeekId)),
        )
        .select(({ sa, c }) => ({
          week_id: sa.week_id,
          congregation_name: c?.name,
        })),
    [publisherId, thisWeekId],
  );

  // --- Cleaning major (group-based) ---
  const { data: cleanMajorAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ cm: cleanMajorCollection })
        .where(({ cm }) =>
          and(
            eq(cm.group_id, groupId),
            eq(cm.congregation_id, congregationId),
            gte(cm.week_id, thisWeekId),
          ),
        ),
    [groupId, congregationId, thisWeekId],
  );

  // --- Cleaning minor (group-based) ---
  const { data: cleanMinorAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ cm: cleanMinorCollection })
        .where(({ cm }) =>
          and(
            eq(cm.group_id, groupId),
            eq(cm.congregation_id, congregationId),
            gte(cm.week_id, thisWeekId),
          ),
        ),
    [groupId, congregationId, thisWeekId],
  );

  // Queries are loading if publisher exists but all data arrays are still undefined
  const isLoading =
    !!publisher &&
    (midweekAssignments === undefined ||
      weekendAssignments === undefined ||
      avAssignments === undefined ||
      speakerAssignments === undefined ||
      cleanMajorAssignments === undefined ||
      cleanMinorAssignments === undefined);

  // --- Build the grouped items ---
  const items: AssignmentItem[] = [];

  if (publisher) {
    // Group midweek assignments + midweek AV by week
    const midweekByWeek = new Map<string, string[]>();
    for (const a of midweekAssignments ?? []) {
      const existing = midweekByWeek.get(a.week_id) ?? [];
      const label = assignmentLabels[a.assignment_id];
      if (label) existing.push(label);
      midweekByWeek.set(a.week_id, existing);
    }
    for (const a of avAssignments ?? []) {
      if (a.assignment_id.endsWith("_midweek")) {
        const existing = midweekByWeek.get(a.week_id) ?? [];
        const label = assignmentLabels[a.assignment_id];
        if (label) existing.push(label);
        midweekByWeek.set(a.week_id, existing);
      }
    }
    for (const [weekId, details] of midweekByWeek) {
      items.push({
        key: `midweek-${weekId}`,
        title: "Midweek Assignment",
        dateLabel: getTheocraticWeekLabel(weekId, {
          format: "week-range-capital-case",
          useRelativeWeek: true,
        }),
        sortDate: weekId,
        sortOrder: 1,
        details,
      });
    }

    // Group weekend assignments + weekend AV by week
    const weekendByWeek = new Map<string, string[]>();
    for (const a of weekendAssignments ?? []) {
      const existing = weekendByWeek.get(a.week_id) ?? [];
      const label = assignmentLabels[a.assignment_id];
      if (label) existing.push(label);
      weekendByWeek.set(a.week_id, existing);
    }
    for (const a of avAssignments ?? []) {
      if (a.assignment_id.endsWith("_weekend")) {
        const existing = weekendByWeek.get(a.week_id) ?? [];
        const label = assignmentLabels[a.assignment_id];
        if (label) existing.push(label);
        weekendByWeek.set(a.week_id, existing);
      }
    }
    for (const [weekId, details] of weekendByWeek) {
      items.push({
        key: `weekend-${weekId}`,
        title: "Weekend Assignment",
        dateLabel: getTheocraticWeekLabel(weekId, {
          format: "week-range-capital-case",
          useRelativeWeek: true,
        }),
        sortDate: weekId,
        sortOrder: 2,
        details,
      });
    }

    // Speaker assignments grouped by week
    const speakerByWeek = new Map<string, string[]>();
    for (const a of speakerAssignments ?? []) {
      const existing = speakerByWeek.get(a.week_id) ?? [];
      if (a.congregation_name) existing.push(a.congregation_name);
      speakerByWeek.set(a.week_id, existing);
    }
    for (const [weekId, details] of speakerByWeek) {
      items.push({
        key: `speaker-${weekId}`,
        title: "Speaker Assignment",
        dateLabel: getTheocraticWeekLabel(weekId, {
          format: "week-range-capital-case",
          useRelativeWeek: true,
        }),
        sortDate: weekId,
        sortOrder: 3,
        details,
      });
    }

    // Cleaning assignments grouped by week (combining major and minor)
    const cleaningByWeek = new Map<string, string[]>();
    for (const a of cleanMajorAssignments ?? []) {
      const existing = cleaningByWeek.get(a.week_id) ?? [];
      existing.push("Thorough Clean");
      cleaningByWeek.set(a.week_id, existing);
    }
    for (const a of cleanMinorAssignments ?? []) {
      const existing = cleaningByWeek.get(a.week_id) ?? [];
      existing.push("Light Clean");
      cleaningByWeek.set(a.week_id, existing);
    }
    for (const [weekId, details] of cleaningByWeek) {
      items.push({
        key: `cleaning-${weekId}`,
        title: "Cleaning Assignment",
        dateLabel: getTheocraticWeekLabel(weekId, {
          format: "week-range-capital-case",
          useRelativeWeek: true,
        }),
        sortDate: weekId,
        sortOrder: 4,
        details,
      });
    }
  }

  // Sort by date ascending, then by sortOrder within the same week
  items.sort((a, b) => {
    const dateCompare = a.sortDate.localeCompare(b.sortDate);
    if (dateCompare !== 0) return dateCompare;
    return a.sortOrder - b.sortOrder;
  });

  return { assignments: items, isLoading };
}
