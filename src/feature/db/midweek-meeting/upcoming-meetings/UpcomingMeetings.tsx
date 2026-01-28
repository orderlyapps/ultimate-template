import { addWeeks, formatDate, startOfWeek } from "date-fns";
import type { FC } from "react";
import { UpcomingMeetingRow } from "./components/upcoming-meeting-row/UpcomingMeetingRow";
import { useUpcomingMeetingsStore } from "./state/useUpcomingMeetingsStore";

export const UpcomingMeetings: FC = () => {
  const weeksToShow = useUpcomingMeetingsStore((s) => s.weeksToShow);
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const dates = Array.from({ length: weeksToShow }).map((_, i) => {
    const date = addWeeks(start, i);
    return formatDate(date, "yyyy-MM-dd");
  });

  return (
    <>
      {dates.map((weekId, index) => (
        <UpcomingMeetingRow key={weekId} weekId={weekId} index={index} />
      ))}
    </>
  );
};
