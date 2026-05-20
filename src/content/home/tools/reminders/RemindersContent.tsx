import { addWeeks } from "date-fns/addWeeks";
import { format } from "date-fns/format";
import { startOfWeek } from "date-fns/startOfWeek";
import { NavItem } from "@navigation/nav-item/NavItem";

/**
 * Returns the Monday week_id (YYYY-MM-DD) for a date offset by `weeksOffset` weeks from today.
 */
function getWeekId(weeksOffset: number): string {
  const monday = startOfWeek(addWeeks(new Date(), weeksOffset), {
    weekStartsOn: 1,
  });
  return format(monday, "yyyy-MM-dd");
}

/**
 * RemindersContent - Empty placeholder for reminders tool.
 * Will be populated with reminder-related features later.
 */

export function RemindersContent() {
  const defaultWeekId = getWeekId(4);

  return (
    <NavItem routerLink={`/home/tools/clam-assignment-forms/${defaultWeekId}`}>
      CLAM Assignment Forms
    </NavItem>
  );
}
