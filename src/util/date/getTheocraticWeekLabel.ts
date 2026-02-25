import { startOfWeek, endOfWeek, isWithinInterval, addWeeks } from "date-fns";

interface FormatOptions {
  format?: "week-label" | "week-range" | "week-range-capital-case";
  useRelativeWeek?: boolean;
}

/**
 * Formats a date string into a readable week label
 * @param dateStr - Date string in YYYY-MM-DD format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const getTheocraticWeekLabel = (
  dateStr: string,
  options: FormatOptions = {},
): string => {
  const { format = "week-range", useRelativeWeek = false } = options;

  const [year, month, day] = dateStr.split("-").map(Number);

  if (useRelativeWeek) {
    const date = new Date(year, month - 1, day);
    const today = new Date();
    
    // Get the start and end of the current week (Monday-Sunday)
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
    
    // Get the start and end of next week
    const nextWeekStart = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });
    const nextWeekEnd = endOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });
    
    // Check if date is in current week
    if (isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })) {
      return "This Week";
    }
    
    // Check if date is in next week
    if (isWithinInterval(date, { start: nextWeekStart, end: nextWeekEnd })) {
      return "Next Week";
    }
    
    // Fall through to apply the specified format if not in current or next week
  }

  if (format === "week-label") {
    // Original format: "Monday, September 8"
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  // Default format: "MMMM DD - MMMM DD" (second month only if different)
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const startMonth = startDate.toLocaleDateString(undefined, { month: "long" });
  const startDay = startDate.getDate();

  const endMonth = endDate.toLocaleDateString(undefined, { month: "long" });
  const endDay = endDate.getDate();

  const isCapitalCase = format === "week-range-capital-case";

  if (startMonth === endMonth) {
    return `${!isCapitalCase ? startMonth.toUpperCase() : startMonth} ${startDay}–${endDay}`;
  } else {
    return `${!isCapitalCase ? startMonth.toUpperCase() : startMonth} ${startDay}–${!isCapitalCase ? endMonth.toUpperCase() : endMonth} ${endDay}`;
  }
};
