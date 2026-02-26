import type { AVAssignment, AVAssignmentID } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment, MidweekAssignmentID } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment, WeekendAssignmentID } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";


export type AssignmentItem = {
  kind: "Weekend Assignment" | "Speaker Assignment" | "Midweek Assignment" | "AV Assignment";
  key: string;
  title: MidweekAssignmentID | WeekendAssignmentID | AVAssignmentID | "speaker";
};

export type PublicTalkInfo = {
  week_id: string;
  outline_theme: string;
  speaker_first_name: string;
  speaker_last_name: string;
  speaker_display_name: string | null | undefined;
  speaker_congregation_id: string;
  congregation_name: string | null;
};

export type WeekGroup = {
  type: "week";
  weekId: string;
  midweekAssignments: AssignmentItem[];
  weekendAssignments: AssignmentItem[];
  publicTalk: PublicTalkInfo | null;
};

export type MonthGroup = {
  type: "month";
  monthId: string;
  monthLabel: string;
  weeks: WeekGroup[];
  events: Event[];
};

export type HomeItem = MonthGroup;

type UseHomeItemsParams = {
  weekendAssignments: WeekendAssignment[] | undefined;
  speakerAssignments: SpeakerAssignment[] | undefined;
  midweekAssignments: MidweekAssignment[] | undefined;
  avAssignments: AVAssignment[] | undefined;
  events: Event[] | undefined;
  publicTalks: PublicTalkInfo[] | undefined;
};

export const useHomeItems = ({
  weekendAssignments,
  speakerAssignments,
  midweekAssignments,
  avAssignments,
  events,
  publicTalks,
}: UseHomeItemsParams) => {
  const allAssignments: (AssignmentItem & { weekId: string; meetingType: "midweek" | "weekend" })[] = [
    ...(weekendAssignments ?? []).map((a) => ({
      kind: "Weekend Assignment" as const,
      weekId: a.week_id,
      key: `weekend-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
      meetingType: "weekend" as const,
    })),
    ...(speakerAssignments ?? []).map((a) => ({
      kind: "Speaker Assignment" as const,
      weekId: a.week_id,
      key: `speaker-${a.congregation_id}-${a.week_id}-${a.speaker_id}`,
      title: "speaker" as const,
      meetingType: "weekend" as const,
    })),
    ...(midweekAssignments ?? []).map((a) => ({
      kind: "Midweek Assignment" as const,
      weekId: a.week_id,
      key: `midweek-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
      meetingType: "midweek" as const,
    })),
    ...(avAssignments ?? []).map((a) => ({
      kind: "AV Assignment" as const,
      weekId: a.week_id,
      key: `av-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
      meetingType: a.assignment_id.endsWith("_midweek") ? "midweek" as const : "weekend" as const,
    })),
  ];

  const publicTalkMap = new Map<string, PublicTalkInfo>();
  for (const talk of publicTalks ?? []) {
    publicTalkMap.set(talk.week_id, talk);
  }

  const weekMap = new Map<string, { midweek: AssignmentItem[]; weekend: AssignmentItem[] }>();
  
  for (const assignment of allAssignments) {
    const existing = weekMap.get(assignment.weekId) ?? { midweek: [], weekend: [] };
    if (assignment.meetingType === "midweek") {
      existing.midweek.push({
        kind: assignment.kind,
        key: assignment.key,
        title: assignment.title,
      });
    } else {
      existing.weekend.push({
        kind: assignment.kind,
        key: assignment.key,
        title: assignment.title,
      });
    }
    weekMap.set(assignment.weekId, existing);
  }

  for (const talk of publicTalks ?? []) {
    if (!weekMap.has(talk.week_id)) {
      weekMap.set(talk.week_id, { midweek: [], weekend: [] });
    }
  }

  const eventMonthMap = new Map<string, Event[]>();
  for (const event of events ?? []) {
    const [year, month] = event.start_date.split("-");
    const monthId = `${year}-${month}`;
    const existing = eventMonthMap.get(monthId) ?? [];
    existing.push(event);
    eventMonthMap.set(monthId, existing);
  }

  const weekGroups: WeekGroup[] = Array.from(weekMap.entries())
    .map(([weekId, { midweek, weekend }]) => ({
      type: "week" as const,
      weekId,
      midweekAssignments: midweek,
      weekendAssignments: weekend,
      publicTalk: publicTalkMap.get(weekId) ?? null,
    }))
    .sort((a, b) => a.weekId.localeCompare(b.weekId));

  const allMonthIds = new Set<string>();

  const weekMonthMap = new Map<string, WeekGroup[]>();
  for (const week of weekGroups) {
    const [year, month] = week.weekId.split("-");
    const monthId = `${year}-${month}`;
    allMonthIds.add(monthId);
    const existing = weekMonthMap.get(monthId) ?? [];
    existing.push(week);
    weekMonthMap.set(monthId, existing);
  }

  for (const monthId of eventMonthMap.keys()) {
    allMonthIds.add(monthId);
  }

  const now = new Date();
  const currentMonthId = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthId = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;

  const sortedMonthIds = Array.from(allMonthIds).sort((a, b) => a.localeCompare(b));

  const monthGroups: MonthGroup[] = sortedMonthIds.map((monthId) => {
    const weeks = weekMonthMap.get(monthId) ?? [];
    const monthEvents = (eventMonthMap.get(monthId) ?? []).sort((a, b) => a.start_date.localeCompare(b.start_date));
    const [year, month] = monthId.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);

    let monthLabel: string;
    const currentYear = now.getFullYear();
    const monthYear = Number(year);
    if (monthId === currentMonthId) {
      monthLabel = "This Month";
    } else if (monthId === nextMonthId) {
      monthLabel = "Next Month";
    } else if (monthYear !== currentYear) {
      monthLabel = date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    } else {
      monthLabel = date.toLocaleDateString(undefined, { month: "long" });
    }

    return {
      type: "month" as const,
      monthId,
      monthLabel,
      weeks,
      events: monthEvents,
    };
  });

  const items: HomeItem[] = monthGroups;

  return { items };
};
