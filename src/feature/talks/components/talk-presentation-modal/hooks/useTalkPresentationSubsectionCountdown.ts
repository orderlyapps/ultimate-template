import { useEffect, useState } from "react";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { getTalkPresentationCountdownValues } from "../components/talk-presentation-modal-header/utils/getTalkPresentationCountdownValues";

export type TalkPresentationSubsectionCountdown = ReturnType<
  typeof getTalkPresentationCountdownValues
>;

type Params = {
  talk: Outline;
  presentationStartMs: number | null;
  currentIndex: number;
};

function getSubsectionBounds(params: {
  talk: Outline;
  presentationStartMs: number;
  currentIndex: number;
}) {
  const { talk, presentationStartMs, currentIndex } = params;

  let startMs = presentationStartMs;
  let flatIndex = 0;

  for (const section of talk.sections) {
    for (const subsection of section.subsections) {
      const allocationSeconds = Math.max(0, subsection.timeAllocation ?? 0);
      const endMs = startMs + allocationSeconds * 1000;

      if (flatIndex === currentIndex) {
        if (allocationSeconds <= 0) return null;
        return { startMs, endMs };
      }

      startMs = endMs;
      flatIndex += 1;
    }
  }

  return null;
}

export function useTalkPresentationSubsectionCountdown({
  talk,
  presentationStartMs,
  currentIndex,
}: Params): TalkPresentationSubsectionCountdown | null {
  const [nowMs, setNowMs] = useState(() => Date.now());

  const bounds =
    presentationStartMs !== null
      ? getSubsectionBounds({
          talk,
          presentationStartMs,
          currentIndex,
        })
      : null;

  const isRunning = presentationStartMs !== null && bounds !== null;

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  return isRunning && bounds
    ? getTalkPresentationCountdownValues({
        startMs: bounds.startMs,
        endMs: bounds.endMs,
        nowMs,
      })
    : null;
}
