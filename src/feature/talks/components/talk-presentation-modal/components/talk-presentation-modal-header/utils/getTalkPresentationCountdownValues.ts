export function getTalkPresentationCountdownValues(params: {
  startMs: number;
  endMs: number;
  nowMs: number;
}) {
  const { startMs, endMs, nowMs } = params;
  const totalSeconds = Math.max(1, Math.ceil((endMs - startMs) / 1000));
  const remainingSeconds = Math.max(0, Math.ceil((endMs - nowMs) / 1000));
  const elapsedSeconds = Math.min(totalSeconds, totalSeconds - remainingSeconds);
  const progress = Math.min(1, Math.max(0, elapsedSeconds / totalSeconds));

  return {
    totalSeconds,
    remainingSeconds,
    elapsedSeconds,
    progress,
  };
}
