import { and, eq, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@tanstack-db/av_assignment/avAssignmentCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { AVAssignment } from "@tanstack-db/av_assignment/avAssignmentSchema";
import type { Event } from "@tanstack-db/event/eventSchema";

/**
 * Assignment labels for audio/video assignments
 */
const assignmentLabels: Record<string, string> = {
  video_midweek: "Video",
  audio_midweek: "Audio",
  platform_midweek: "Platform",
  microphone_1_midweek: "Mic 1",
  microphone_2_midweek: "Mic 2",
  entrance_midweek: "Entrance",
  auditorium_midweek: "Auditorium",
  zoom_midweek: "Zoom",
  video_weekend: "Video",
  audio_weekend: "Audio",
  platform_weekend: "Platform",
  microphone_1_weekend: "Mic 1",
  microphone_2_weekend: "Mic 2",
  entrance_weekend: "Entrance",
  auditorium_weekend: "Auditorium",
  zoom_weekend: "Zoom",
};

/**
 * Midweek AV assignment IDs in display order
 */
const midweekAVAssignmentIDs = [
  "video_midweek",
  "audio_midweek",
  "platform_midweek",
  "microphone_1_midweek",
  "microphone_2_midweek",
  "entrance_midweek",
  "auditorium_midweek",
  "zoom_midweek",
] as const;

/**
 * Weekend AV assignment IDs in display order
 */
const weekendAVAssignmentIDs = [
  "video_weekend",
  "audio_weekend",
  "platform_weekend",
  "microphone_1_weekend",
  "microphone_2_weekend",
  "entrance_weekend",
  "auditorium_weekend",
  "zoom_weekend",
] as const;

/**
 * Data for a single week in the audio/video schedule
 */
export type WeekAVScheduleData = {
  weekId: string;
  assignments: Map<string, Publisher | undefined>;
  events: Event[];
};

/**
 * Hook to fetch all audio/video assignments for a date range.
 * Returns the AV assignments for each week in the range, combined with publisher data.
 *
 * @param dateRange - Object containing firstMonday and lastMonday ISO date strings
 * @returns Object with weeks array (sorted by week_id), assignment labels, and isLoading flag
 */
export function useAudioVideoScheduleData(dateRange: {
  firstMonday: string;
  lastMonday: string;
}): {
  weeks: WeekAVScheduleData[];
  assignmentLabels: Record<string, string>;
  midweekAVAssignmentIDs: readonly string[];
  weekendAVAssignmentIDs: readonly string[];
  isLoading: boolean;
} {
  const [userCongregation] = useUserCongregation();

  // Fetch AV assignments for weeks in the selected month range
  const { data: avAssignments } = useLiveQuery(
    (q) =>
      q
        .from({ av: avAssignmentCollection })
        .where(({ av }) =>
          and(
            gte(av.week_id, dateRange.firstMonday),
            lte(av.week_id, dateRange.lastMonday),
            eq(av.congregation_id, userCongregation?.id ?? ""),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday, userCongregation?.id],
  );

  // Fetch all publishers to resolve names
  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  // Fetch events for the date range
  const { data: events } = useLiveQuery(
    (q) =>
      q
        .from({ e: eventCollection })
        .where(({ e }) =>
          and(
            gte(e.start_date, dateRange.firstMonday),
            lte(e.start_date, dateRange.lastMonday),
            eq(e.congregation_id, userCongregation?.id ?? ""),
          ),
        ),
    [dateRange.firstMonday, dateRange.lastMonday, userCongregation?.id],
  );

  // Build a lookup map for publishers by ID
  const publisherMap = new Map<string, Publisher>();
  for (const publisher of publishers ?? []) {
    publisherMap.set(publisher.id, publisher);
  }

  // Group assignments by week_id
  const assignmentsByWeek = new Map<string, AVAssignment[]>();
  for (const assignment of avAssignments ?? []) {
    const existing = assignmentsByWeek.get(assignment.week_id) ?? [];
    existing.push(assignment);
    assignmentsByWeek.set(assignment.week_id, existing);
  }

  // Group events by week_id (matching the week start date)
  const eventsByWeek = new Map<string, Event[]>();
  for (const event of events ?? []) {
    const existing = eventsByWeek.get(event.start_date) ?? [];
    existing.push(event);
    eventsByWeek.set(event.start_date, existing);
  }

  // Build the weeks array with assignments and events
  const weeks: WeekAVScheduleData[] = [];

  // Generate all weeks in the date range
  const startDate = new Date(dateRange.firstMonday);
  const endDate = new Date(dateRange.lastMonday);

  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 7)
  ) {
    const weekId = current.toISOString().split("T")[0];
    const weekAssignments = assignmentsByWeek.get(weekId) ?? [];
    const assignmentMap = new Map<string, Publisher | undefined>();

    for (const assignment of weekAssignments) {
      const publisher = publisherMap.get(assignment.participant_id);
      assignmentMap.set(assignment.assignment_id, publisher);
    }

    weeks.push({
      weekId,
      assignments: assignmentMap,
      events: eventsByWeek.get(weekId) ?? [],
    });
  }

  const isLoading =
    avAssignments === undefined ||
    publishers === undefined ||
    events === undefined;

  return {
    weeks,
    assignmentLabels,
    midweekAVAssignmentIDs,
    weekendAVAssignmentIDs,
    isLoading,
  };
}
