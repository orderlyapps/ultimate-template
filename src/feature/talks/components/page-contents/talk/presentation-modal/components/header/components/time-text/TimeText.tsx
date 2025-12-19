import { Text } from "@ionic-display/text/Text";

type Props = {
  remainingSeconds: number;
};

function formatMinutesSeconds(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function TimeText({ remainingSeconds }: Props) {
  return (
    <Text bold size="xl">
      {formatMinutesSeconds(remainingSeconds)}
    </Text>
  );
}
