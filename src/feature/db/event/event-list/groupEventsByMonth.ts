import { format, parseISO } from "date-fns";
import type { Event } from "@tanstack-db/event/eventSchema";

export type MonthGroup = {
  label: string;
  events: Event[];
};

const currentYear = new Date().getFullYear();

export const groupEventsByMonth = (events: Event[]): MonthGroup[] => {
  const groups: Map<string, Event[]> = new Map();

  for (const event of events) {
    const date = parseISO(event.start_date);
    const pattern = date.getFullYear() === currentYear ? "MMMM" : "MMMM yyyy";
    const key = format(date, pattern);
    const existing = groups.get(key);
    if (existing) {
      existing.push(event);
    } else {
      groups.set(key, [event]);
    }
  }

  return Array.from(groups, ([label, events]) => ({ label, events }));
};
