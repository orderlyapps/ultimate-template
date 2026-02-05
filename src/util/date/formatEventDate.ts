import { format } from "date-fns";

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatEventDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayName = format(date, "EEEE");
  const dayNumber = day;
  const suffix = getOrdinalSuffix(dayNumber);
  return `${dayName} ${dayNumber}${suffix}`;
}
