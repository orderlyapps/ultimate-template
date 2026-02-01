import { format, parseISO } from "date-fns";

export const getDayName = (date: string): string => {
  const startDate = parseISO(date);
  return format(startDate, "EEEE");
};
