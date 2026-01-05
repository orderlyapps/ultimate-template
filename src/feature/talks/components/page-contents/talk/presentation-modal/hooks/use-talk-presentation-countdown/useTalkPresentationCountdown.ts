import { useEffect, useRef, useState } from "react";
import { getTalkPresentationCountdownValues } from "../../components/header/utils/getTalkPresentationCountdownValues";

// Public return type for the hook, derived from the countdown calculation helper.
// This ensures the hook always stays in sync with the shape used by the UI.
export type TalkPresentationCountdown = ReturnType<
  typeof getTalkPresentationCountdownValues
>;

type Params = {
  // Unix timestamp (ms) when the presentation is considered started.
  startMs: number | null;
  // Unix timestamp (ms) when the presentation is considered ended.
  endMs: number | null;
  // Callback fired once when the countdown reaches zero (or below).
  onFinished: () => void;
};

// Drives a presentation countdown by:
// - Ticking internal "now" state once per second while running.
// - Computing derived countdown values for the caller to render.
// - Notifying once when the countdown completes.
export function useTalkPresentationCountdown({
  startMs,
  endMs,
  onFinished,
}: Params): TalkPresentationCountdown | null {
  // The only piece of state we need: the current time.
  // Derived countdown values are recalculated from this.
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Prevents `onFinished` from firing repeatedly across re-renders once we reach 0.
  const hasNotifiedFinished = useRef(false);

  // The countdown only runs when both boundaries are known.
  const isRunning = startMs !== null && endMs !== null;

  useEffect(() => {
    // If the countdown parameters change, allow `onFinished` to fire again
    // for the new countdown.
    hasNotifiedFinished.current = false;
  }, [startMs, endMs]);

  useEffect(() => {
    // While running, update `nowMs` every second to keep the countdown fresh.
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  // Compute the derived countdown values that the UI needs.
  // Returning `null` allows callers to treat "not running" as a distinct state.
  const countdown =
    isRunning && startMs !== null && endMs !== null
      ? getTalkPresentationCountdownValues({ startMs, endMs, nowMs })
      : null;

  useEffect(() => {
    // Fire `onFinished` once when the countdown completes.
    if (!isRunning) return;
    if (!countdown) return;
    if (countdown.remainingSeconds > 0) return;
    if (hasNotifiedFinished.current) return;

    hasNotifiedFinished.current = true;
    onFinished();
  }, [countdown, isRunning, onFinished]);

  // Consumers render based on the derived values.
  return countdown;
}
