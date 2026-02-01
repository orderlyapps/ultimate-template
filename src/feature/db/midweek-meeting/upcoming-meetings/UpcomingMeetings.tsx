import type { FC } from "react";
import { UpcomingMeetingRow } from "./components/upcoming-meeting-row/UpcomingMeetingRow";

type UpcomingMeetingsProps = {
  weekId: string;
};

export const UpcomingMeetings: FC<UpcomingMeetingsProps> = ({ weekId }) => {
  return <UpcomingMeetingRow weekId={weekId} />;
};
