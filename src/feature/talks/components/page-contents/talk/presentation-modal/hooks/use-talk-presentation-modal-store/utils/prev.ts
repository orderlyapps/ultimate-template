import { recalculateTalkPresentationSubsectionTiming } from "../../../utils/recalculateTalkPresentationSubsectionTiming";

interface PrevParams {
  currentIndex: number;
  endMs: number | null;
  allSubsectionTimes: number[];
}

export const prev = ({
  currentIndex,
  endMs,
  allSubsectionTimes,
}: PrevParams) => {
  const nextIndex = Math.max(0, currentIndex - 1);

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
