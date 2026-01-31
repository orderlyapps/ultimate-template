import { format, startOfWeek } from "date-fns";

export function getThisWeekID(): string {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  return format(monday, "yyyy-MM-dd");
}
