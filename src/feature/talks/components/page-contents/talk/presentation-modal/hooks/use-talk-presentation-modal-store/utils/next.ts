import { recalculateTalkPresentationSubsectionTiming } from "../../../utils/recalculateTalkPresentationSubsectionTiming";

interface NextParams {
  currentIndex: number;
  maxIndex: number;
  endMs: number | null;
  allSubsectionTimes: number[];
}

export const next = ({
  currentIndex,
  maxIndex,
  endMs,
  allSubsectionTimes,
}: NextParams) => {
  const safeMax = Math.max(0, Math.floor(maxIndex));
  const nextIndex = Math.min(safeMax, currentIndex + 1);

  if (endMs === null || allSubsectionTimes.length === 0) {
    return { currentIndex: nextIndex };
  }

  const recalculation = recalculateTalkPresentationSubsectionTiming({
    allSubsectionTimes,
    currentIndex: nextIndex,
    currentTimeMs: Date.now(),
    endTimeMs: endMs,
  });

  return {
    currentIndex: nextIndex,
    subsectionStartMs: recalculation?.subsectionStartMs ?? null,
    subsectionEndMs: recalculation?.subsectionEndMs ?? null,
    subsectionTimingAdjustmentPercent:
      recalculation !== null ? recalculation.percentageDifference * 100 : null,
    subsectionTimingAdjustmentMs:
      recalculation !== null
        ? recalculation.subsectionTimingAdjustmentMs
        : null,
  };
};
