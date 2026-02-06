import { format, parseISO } from "date-fns";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { getThisWeekID } from "@date/getThisWeekID";

export type CleaningEntry = {
  week_id: string;
  congregation_id: string;
  group_id: string;
  type: "major" | "minor";
};

export type WeekGroup = {
  weekId: string;
  weekLabel: string;
  entries: CleaningEntry[];
};

export type MonthGroup = {
  label: string;
  weeks: WeekGroup[];
};

const currentYear = new Date().getFullYear();

export const groupCleaningByMonth = (
  entries: CleaningEntry[],
): MonthGroup[] => {
  const thisWeekId = getThisWeekID();
  const months = new Map<string, Map<string, CleaningEntry[]>>();

  for (const entry of entries) {
    if (entry.week_id < thisWeekId) continue;
    const date = parseISO(entry.week_id);
    const pattern =
      date.getFullYear() === currentYear ? "MMMM" : "MMMM yyyy";
    const monthKey = format(date, pattern);
    const weekKey = entry.week_id;

    let weekMap = months.get(monthKey);
    if (!weekMap) {
      weekMap = new Map();
      months.set(monthKey, weekMap);
    }

    const existing = weekMap.get(weekKey);
    if (existing) {
      existing.push(entry);
    } else {
      weekMap.set(weekKey, [entry]);
    }
  }

  return Array.from(months, ([label, weekMap]) => ({
    label,
    weeks: Array.from(weekMap, ([weekId, entries]) => ({
      weekId,
      weekLabel: getTheocraticWeekLabel(weekId),
      entries,
    })),
  }));
};
