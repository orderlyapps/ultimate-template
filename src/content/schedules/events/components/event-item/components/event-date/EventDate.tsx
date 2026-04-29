import type { FC } from "react";
import { Text } from "@ionic-display/text/Text";
import { formatEventDate } from "../../../../formatEventDate";

type Props = {
  startDate: string;
  endDate?: string | null;
};

export const EventDate: FC<Props> = ({ startDate, endDate }) => {
  return <Text bold>{formatEventDate(startDate, endDate)}</Text>;
};
