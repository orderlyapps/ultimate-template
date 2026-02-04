import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";
import type { MidweekAssignment } from "@tanstack-db/midweek_assignment/midweekAssignmentSchema";
import type { SpeakerAssignment } from "@tanstack-db/speaker_assignment/speakerAssignmentSchema";
import type { WeekendAssignment } from "@tanstack-db/weekend_assignment/weekendAssignmentSchema";

export type AssignmentItem = {
  kind: "Weekend Assignment" | "Speaker Assignment" | "Midweek Assignment" | "AV Assignment";
  key: string;
  title: string;
};

export type WeekGroup = {
  type: "week";
  weekId: string;
  assignments: AssignmentItem[];
};

export type EventItem = {
  type: "event";
  event: Event;
};

export type HomeItem = WeekGroup | EventItem;

type UseHomeItemsParams = {
  weekendAssignments: WeekendAssignment[] | undefined;
  speakerAssignments: SpeakerAssignment[] | undefined;
  midweekAssignments: MidweekAssignment[] | undefined;
  avAssignments: AVAssignment[] | undefined;
  events: Event[] | undefined;
};

export const useHomeItems = ({
  weekendAssignments,
  speakerAssignments,
  midweekAssignments,
  avAssignments,
  events,
}: UseHomeItemsParams) => {
  const allAssignments: (AssignmentItem & { weekId: string })[] = [
    ...(weekendAssignments ?? []).map((a) => ({
      kind: "Weekend Assignment" as const,
      weekId: a.week_id,
      key: `weekend-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
    })),
    ...(speakerAssignments ?? []).map((a) => ({
      kind: "Speaker Assignment" as const,
      weekId: a.week_id,
      key: `speaker-${a.congregation_id}-${a.week_id}-${a.speaker_id}`,
      title: a.outline_id ?? "",
    })),
    ...(midweekAssignments ?? []).map((a) => ({
      kind: "Midweek Assignment" as const,
      weekId: a.week_id,
      key: `midweek-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
    })),
    ...(avAssignments ?? []).map((a) => ({
      kind: "AV Assignment" as const,
      weekId: a.week_id,
      key: `av-${a.congregation_id}-${a.week_id}-${a.assignment_id}`,
      title: a.assignment_id,
    })),
  ];

  const weekMap = new Map<string, AssignmentItem[]>();
  for (const assignment of allAssignments) {
    const existing = weekMap.get(assignment.weekId) ?? [];
    existing.push({
      kind: assignment.kind,
      key: assignment.key,
      title: assignment.title,
    });
    weekMap.set(assignment.weekId, existing);
  }

  const weekGroups: WeekGroup[] = Array.from(weekMap.entries()).map(
    ([weekId, assignments]) => ({ type: "week" as const, weekId, assignments }),
  );

  const eventItems: EventItem[] = (events ?? []).map((event) => ({
    type: "event" as const,
    event,
  }));

  const items: HomeItem[] = [...weekGroups, ...eventItems].sort((a, b) => {
    const dateA = a.type === "week" ? a.weekId : a.event.start_date;
    const dateB = b.type === "week" ? b.weekId : b.event.start_date;
    return dateA.localeCompare(dateB);
  });

  return { items };
};
