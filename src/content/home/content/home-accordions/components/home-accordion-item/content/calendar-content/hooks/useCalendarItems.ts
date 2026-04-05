import { and, eq, gte, or, useLiveQuery } from "@tanstack/react-db";
import { eventCollection } from "@tanstack-db/event/eventCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { getThisWeekID } from "@util/date/getThisWeekID";
import { getWeekIdFromDate } from "@date/getWeekIdFromDate";
import { formatEventDate } from "@date/formatEventDate";
import { format } from "date-fns";

/**
 * Represents a single calendar event item.
 * Used by CalendarContent to render upcoming events.
 */
export type CalendarItem = {
  key: string;
  title: string;
  dateLabel: string;
  sortDate: string;
  monthId: string;
};

/**
 * Returns a human-readable month label from a "YYYY-MM" monthId.
 * Shows "This Month" / "Next Month" for relative months,
 * and includes the year if it differs from the current year.
 */
export function getMonthLabel(monthId: string): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthId = format(now, "yyyy-MM");
  const nextMonth = new Date(currentYear, now.getMonth() + 1, 1);
  const nextMonthId = format(nextMonth, "yyyy-MM");

  if (monthId === currentMonthId) return "This Month";
  if (monthId === nextMonthId) return "Next Month";

  const [year, month] = monthId.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  if (Number(year) !== currentYear) {
    return date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString(undefined, { month: "long" });
}

/**
 * Queries upcoming events for the user's congregation.
 * Filters out events whose effective end date is in the past.
 * @returns sorted array of CalendarItem and loading state
 */
export function useCalendarItems(): {
  items: CalendarItem[];
  isLoading: boolean;
} {
  const congregationId = getUserCongregation()?.id;
  const thisWeekId = getThisWeekID();

  // --- Upcoming events for the congregation ---
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

  const isLoading = !!congregationId && events === undefined;

  // Today's date string for filtering past events
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const items: CalendarItem[] = [];

  // Build event items, skipping events whose end date is in the past
  for (const event of events ?? []) {
    const effectiveEnd = event.end_date ?? event.start_date;
    if (effectiveEnd < todayStr) continue;
    items.push(buildEventItem(event));
  }

  // Sort by start date ascending
  items.sort((a, b) => a.sortDate.localeCompare(b.sortDate));

  return { items, isLoading };
}

/**
 * Converts an event record into a CalendarItem with a
 * human-readable title and formatted date label.
 */
function buildEventItem(event: {
  id: string;
  type: string;
  name: string;
  start_date: string;
  end_date: string | null;
}): CalendarItem {
  const dateLabel = formatEventDate(event.start_date, event.end_date);
  const sortDate = getWeekIdFromDate(event.start_date);

  // Map event type to a user-friendly title
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

  return {
    key: `event-${event.id}`,
    title,
    dateLabel,
    sortDate,
    monthId: event.start_date.slice(0, 7),
  };
}
