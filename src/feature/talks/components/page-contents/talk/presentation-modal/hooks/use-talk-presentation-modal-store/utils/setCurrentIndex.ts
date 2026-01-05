import { recalculateTalkPresentationSubsectionTiming } from "../../../utils/recalculateTalkPresentationSubsectionTiming";

interface SetCurrentIndexParams {
  currentIndex: number;
  endMs: number | null;
  allSubsectionTimes: number[];
}

export const setCurrentIndex = ({
  currentIndex,
  endMs,
  allSubsectionTimes,
}: SetCurrentIndexParams) => {
  const rawNextIndex = Math.max(0, Math.floor(currentIndex));
  const maxIndex = Math.max(0, allSubsectionTimes.length - 1);
  const nextIndex = Math.min(rawNextIndex, maxIndex);

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
