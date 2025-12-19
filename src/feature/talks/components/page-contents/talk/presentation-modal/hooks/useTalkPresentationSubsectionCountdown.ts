import { useEffect, useState } from "react";
import { getTalkPresentationCountdownValues } from "../components/header/utils/getTalkPresentationCountdownValues";

export type TalkPresentationSubsectionCountdown = ReturnType<
  typeof getTalkPresentationCountdownValues
>;

type Params = {
  subsectionStartMs: number | null;
  subsectionEndMs: number | null;
};

export function useTalkPresentationSubsectionCountdown({
  subsectionStartMs,
  subsectionEndMs,
}: Params): TalkPresentationSubsectionCountdown | null {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const isRunning = subsectionStartMs !== null && subsectionEndMs !== null;

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  return isRunning && subsectionStartMs !== null && subsectionEndMs !== null
    ? getTalkPresentationCountdownValues({
        startMs: subsectionStartMs,
        endMs: subsectionEndMs,
        nowMs,
      })
    : null;
}
