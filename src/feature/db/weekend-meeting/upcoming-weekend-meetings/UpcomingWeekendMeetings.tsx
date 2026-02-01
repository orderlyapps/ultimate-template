import type { FC } from "react";
import { UpcomingWeekendMeetingRow } from "./components/upcoming-weekend-meeting-row/UpcomingWeekendMeetingRow";

type UpcomingWeekendMeetingsProps = {
  weekId: string;
};

export const UpcomingWeekendMeetings: FC<UpcomingWeekendMeetingsProps> = ({
  weekId,
}) => {
  return <UpcomingWeekendMeetingRow weekId={weekId} />;
};
