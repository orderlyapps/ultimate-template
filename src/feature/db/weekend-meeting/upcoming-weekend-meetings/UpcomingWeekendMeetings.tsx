import { addWeeks, format, startOfWeek } from "date-fns";
import type { FC } from "react";
import { UpcomingWeekendMeetingRow } from "./components/upcoming-weekend-meeting-row/UpcomingWeekendMeetingRow";
import { useUpcomingWeekendMeetingsStore } from "./state/useUpcomingWeekendMeetingsStore";

export const UpcomingWeekendMeetings: FC = () => {
  const weeksToShow = useUpcomingWeekendMeetingsStore((s) => s.weeksToShow);
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const dates = Array.from({ length: weeksToShow }).map((_, i) => {
    const date = addWeeks(start, i);
    return format(date, "yyyy-MM-dd");
  });

  return (
    <>
      {dates.map((weekId, index) => (
        <UpcomingWeekendMeetingRow key={weekId} weekId={weekId} index={index} />
      ))}
    </>
  );
};
