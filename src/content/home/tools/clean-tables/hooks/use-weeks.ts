import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { addWeeks, format, startOfWeek, addMonths } from "date-fns";

export interface WeekOption {
  id: string;
  label: string;
}

/**
 * Generates week options for the next 4 months (approximately 16-18 weeks).
 * Each week starts on Monday and is formatted as a date range label.
 *
 * @returns Array of week options with id (YYYY-MM-DD) and label (date range)
 */
export function useWeeks(): WeekOption[] {
  const options: WeekOption[] = [];
  const now = new Date();
  const fourMonthsFromNow = addMonths(now, 4);

  let currentWeekStart = startOfWeek(now, { weekStartsOn: 1 });

  while (currentWeekStart <= fourMonthsFromNow) {
    const weekId = format(currentWeekStart, "yyyy-MM-dd");
    const sunday = addWeeks(currentWeekStart, 1);
    sunday.setDate(sunday.getDate() - 1);

    const label = getTheocraticWeekLabel(weekId);
    options.push({ id: weekId, label });

    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  return options;
}
