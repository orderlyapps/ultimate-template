interface FinishParams {
  endMs: number | null;
}

export const finish = ({ endMs }: FinishParams) => {
  const finishDeltaMs = endMs === null ? null : Date.now() - endMs;

  return {
    startMs: null as number | null,
    endMs: null as number | null,
    finishDeltaMs,
    subsectionStartMs: null as number | null,
    subsectionEndMs: null as number | null,
    subsectionTimingAdjustmentPercent: null as number | null,
    subsectionTimingAdjustmentMs: null as number | null,
    currentIndex: 0,
  };
};
