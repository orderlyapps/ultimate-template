import { recalculateTalkPresentationSubsectionTiming } from "../../../utils/recalculateTalkPresentationSubsectionTiming";

interface StartParams {
  endTime: string;
  allSubsectionTimes: number[];
}

export const start = ({ endTime, allSubsectionTimes }: StartParams) => {
  const nextEndMs = new Date(endTime).getTime();
  if (!Number.isFinite(nextEndMs)) return null;
  const nextStartMs = Date.now();
  if (nextEndMs <= nextStartMs) return null;

  const recalculation = recalculateTalkPresentationSubsectionTiming({
    allSubsectionTimes,
    currentIndex: 0,
    currentTimeMs: nextStartMs,
    endTimeMs: nextEndMs,
  });

  return {
    startMs: nextStartMs,
    endMs: nextEndMs,
    finishDeltaMs: null as number | null,
    subsectionStartMs: recalculation?.subsectionStartMs ?? null,
    subsectionEndMs: recalculation?.subsectionEndMs ?? null,
    subsectionTimingAdjustmentPercent:
      recalculation !== null ? recalculation.percentageDifference * 100 : null,
    subsectionTimingAdjustmentMs:
      recalculation !== null
        ? recalculation.subsectionTimingAdjustmentMs
        : null,
    currentIndex: 0,
  };
};
