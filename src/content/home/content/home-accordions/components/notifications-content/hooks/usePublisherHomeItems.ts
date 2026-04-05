import { and, eq, gte, or, useLiveQuery } from "@tanstack/react-db";
import { weekendAssignmentCollection } from "@tanstack-db/weekend_assignment/weekendAssignmentCollection";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import { cleanMajorCollection } from "@tanstack-db/clean_major/cleanMajorCollection";
import { cleanMinorCollection } from "@tanstack-db/clean_minor/cleanMinorCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { formatEventDate } from "@date/formatEventDate";
import { formatPublisherName } from "@format/formatPublisherName";
import { getWeekIdFromDate } from "@date/getWeekIdFromDate";
import { assignmentLabels } from "@/content/home/content/home-accordions/components/notifications-content/helper/assignmentLabels";

function getMonthId(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  return `${year}-${month}`;
}

export function getMonthLabel(monthId: string): string {
  const now = new Date();
  const currentMonthId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthId = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;

  if (monthId === currentMonthId) return "This Month";
  if (monthId === nextMonthId) return "Next Month";

  const [year, month] = monthId.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number(year) !== now.getFullYear()) {
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString(undefined, { month: "long" });
}

export type HomeItem = {
  key: string;
  title: string;
  dateLabel: string;
  sortDate: string;
  sortOrder: number;
  monthId: string;
  details?: string[];
};

export const usePublisherHomeItems = (
  publisher: Publisher | null | undefined,
): HomeItem[] => {
  const publisherId = publisher?.id ?? "";
  const congregationId = getUserCongregation()?.id;
  const thisWeekId = getThisWeekID();
  const enabled = !!publisher;

  const { data: livePublisher } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .where(({ p }) => eq(p.id, publisherId)),
    [publisherId],
  );

  const groupId = livePublisher?.[0]?.group_id ?? "";

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

  const { data: events } = useLiveQuery(
    (q) =>
      q
        .from({ e: eventCollection })
        .where(({ e }) =>
          and(
            eq(e.congregation_id, congregationId),
            or(gte(e.start_date, thisWeekId), gte(e.end_date, thisWeekId)),
          ),
        ),
    [congregationId, thisWeekId],
  );

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

  const { data: publicTalks } = useLiveQuery(
    (q) =>
      q
        .from({ sa: speakerAssignmentCollection })
        .join({ o: outlineCollection }, ({ sa, o }) => eq(sa.outline_id, o.id))
        .join({ p: publisherCollection }, ({ sa, p }) =>
          eq(sa.speaker_id, p.id),
        )
        .leftJoin({ c: congregationCollection }, ({ p, c }) =>
          eq(p!.congregation_id, c.id),
        )
        .where(({ sa }) =>
          and(
            eq(sa.congregation_id, congregationId),
            eq(sa.week_id, thisWeekId),
          ),
        )
        .select(({ sa, o, p, c }) => ({
          week_id: sa.week_id,
          outline_theme: o!.theme,
          speaker_first_name: p!.first_name,
          speaker_last_name: p!.last_name,
          speaker_display_name: p!.display_name,
          speaker_congregation_id: p!.congregation_id,
          congregation_name: c?.name ?? null,
        })),
    [congregationId, thisWeekId],
  );

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

  const items: HomeItem[] = [];

  // --- Public Talk (only the first one for this week, sortOrder 0) ---
  const firstPublicTalk = (publicTalks ?? [])[0];
  if (firstPublicTalk) {
    const userCongId = congregationId;
    const isLocal = firstPublicTalk.speaker_congregation_id === userCongId;
    const speakerName = formatPublisherName(
      {
        first_name: firstPublicTalk.speaker_first_name ?? "",
        last_name: firstPublicTalk.speaker_last_name ?? "",
        display_name: firstPublicTalk.speaker_display_name,
      },
      "display last",
    );
    const details = [firstPublicTalk.outline_theme ?? ""];
    const congregationLabel =
      !isLocal && firstPublicTalk.congregation_name
        ? `${speakerName} — ${firstPublicTalk.congregation_name}`
        : speakerName;
    details.push(congregationLabel);

    items.push({
      key: `public-talk-${firstPublicTalk.week_id}`,
      title: "Public Talk",
      dateLabel: getTheocraticWeekLabel(firstPublicTalk.week_id, {
        format: "week-range-capital-case",
        useRelativeWeek: true,
      }),
      sortDate: firstPublicTalk.week_id,
      sortOrder: 0,
      monthId: getMonthId(firstPublicTalk.week_id),
      details,
    });
  }

  // --- Grouped midweek assignments + midweek AV by week ---
  if (enabled) {
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
        monthId: getMonthId(weekId),
        details,
      });
    }

    // --- Grouped weekend assignments + weekend AV by week ---
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
        monthId: getMonthId(weekId),
        details,
      });
    }

    // --- Speaker assignments (grouped by week) ---
    const speakerByWeek = new Map<string, string[]>();

    for (const a of speakerAssignments ?? []) {
      const existing = speakerByWeek.get(a.week_id) ?? [];
      if (a.congregation_name) {
        existing.push(a.congregation_name);
      }
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
        sortOrder: 2,
        monthId: getMonthId(weekId),
        details,
      });
    }

    // --- Cleaning assignments (grouped by week, combining major and minor) ---
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
        monthId: getMonthId(weekId),
        details,
      });
    }
  }

  // --- Events (always shown) ---
  for (const event of events ?? []) {
    const eventItem = buildEventItem(event);
    items.push(eventItem);
  }

  // Sort: by sortDate ascending, then by sortOrder ascending
  items.sort((a, b) => {
    const dateCompare = a.sortDate.localeCompare(b.sortDate);
    if (dateCompare !== 0) return dateCompare;
    return a.sortOrder - b.sortOrder;
  });

  return items;
};

function buildEventItem(event: {
  id: string;
  type: string;
  name: string;
  start_date: string;
  end_date: string | null;
  address: string;
  start_time: string | null;
}): HomeItem {
  const dateLabel = formatEventDate(event.start_date, event.end_date);
  const sortDate = getWeekIdFromDate(event.start_date);

  const titleMap: Record<string, string> = {
    circuit_assembly: "Circuit Assembly",
    convention: "Regional Convention",
    memorial: "Memorial",
    circuit_visit: "Circuit Overseer Visit",
    special_meeting: "Special Meeting",
    campaign: event.name,
    special_talk: "Special Talk",
    other: event.name,
  };

  const title = titleMap[event.type] ?? event.name;

  const details: string[] = [];

  if (event.type === "circuit_assembly" || event.type === "convention") {
    if (event.name) details.push(event.name);
    if (event.address) details.push(event.address);
  }

  if (event.type === "memorial" && event.start_time) {
    const time = new Date(
      `${event.start_date}T${event.start_time}`,
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    details.push("Time: " + time);
  }

  return {
    key: `event-${event.id}`,
    title,
    dateLabel,
    sortDate,
    sortOrder: 3,
    monthId: getMonthId(event.start_date),
    details: details.length > 0 ? details : undefined,
  };
}
