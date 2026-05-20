import { addWeeks } from "date-fns/addWeeks";
import { format } from "date-fns/format";
import { startOfWeek } from "date-fns/startOfWeek";
import { NavItem } from "@navigation/nav-item/NavItem";
import { useClamAssignmentFormsStore } from "@/content/home/tools/clam-assignment-forms/store/useClamAssignmentFormsStore";

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
 * RemindersContent - Provides navigation to CLAM Assignment Forms
 * with configurable default weeks ahead.
 */
export function RemindersContent() {
  const defaultWeeksAhead = useClamAssignmentFormsStore(
    (s) => s.defaultWeeksAhead
  );
  const defaultWeekId = getWeekId(defaultWeeksAhead);

  return (
    <NavItem routerLink={`/home/tools/clam-assignment-forms/${defaultWeekId}`}>
      CLAM Assignment Forms
    </NavItem>
  );
}
