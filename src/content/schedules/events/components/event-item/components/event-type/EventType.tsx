import type { FC } from "react";
import { Text } from "@ionic-display/text/Text";

type Props = {
  label: string;
};

export const EventType: FC<Props> = ({ label }) => {
  return <Text>{label}</Text>;
};
