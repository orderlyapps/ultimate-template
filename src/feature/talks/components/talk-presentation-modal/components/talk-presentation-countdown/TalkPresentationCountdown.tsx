import { IonProgressBar } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { useEffect, useRef, useState } from "react";

type Props = {
  startMs: number;
  endMs: number;
  isActive: boolean;
  onFinished: () => void;
};

function formatMinutesSeconds(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function TalkPresentationCountdown({
  startMs,
  endMs,
  isActive,
  onFinished,
}: Props) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const hasNotifiedFinished = useRef(false);

  useEffect(() => {
    hasNotifiedFinished.current = false;
  }, [startMs, endMs]);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isActive]);

  const totalSeconds = Math.max(1, Math.ceil((endMs - startMs) / 1000));
  const remainingSeconds = Math.max(0, Math.ceil((endMs - nowMs) / 1000));
  const elapsedSeconds = Math.min(totalSeconds, totalSeconds - remainingSeconds);
  const progress = Math.min(1, Math.max(0, elapsedSeconds / totalSeconds));

  useEffect(() => {
    if (!isActive) return;
    if (remainingSeconds > 0) return;
    if (hasNotifiedFinished.current) return;

    hasNotifiedFinished.current = true;
    onFinished();
  }, [isActive, remainingSeconds, onFinished]);

  return (
    <div>
      <Text bold size="xl">
        {formatMinutesSeconds(remainingSeconds)}
      </Text>
      <div style={{ height: "0.75rem" }} />
      <IonProgressBar value={progress} />
    </div>
  );
}
