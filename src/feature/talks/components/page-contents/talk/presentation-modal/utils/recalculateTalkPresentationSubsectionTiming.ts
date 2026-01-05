import type { Outline } from "@feature/talks/state/useTalksStore";

export function getFlatSubsectionAllocationsSeconds(talk: Outline): number[] {
  const allocationsSeconds: number[] = [];

  for (const section of talk.sections) {
    for (const subsection of section.subsections) {
      allocationsSeconds.push(Math.max(0, subsection.timeAllocation ?? 0));
    }
  }

  return allocationsSeconds;
}

export type TalkPresentationSubsectionTimingRecalculation = {
  currentTimeMs: number;
  endTimeMs: number;
  allocatedTimeRemainingMs: number;
  actualTimeRemainingMs: number;
  percentageDifference: number;
  subsectionTimingAdjustmentMs: number;
  updatedCurrentSubsectionAllocationMs: number;
  subsectionStartMs: number;
  subsectionEndMs: number;
};

export function recalculateTalkPresentationSubsectionTiming(params: {
  allSubsectionTimes: number[];
  currentIndex: number;
  currentTimeMs: number;
  endTimeMs: number;
}): TalkPresentationSubsectionTimingRecalculation | null {
  const { allSubsectionTimes, currentIndex, currentTimeMs, endTimeMs } = params;

  if (allSubsectionTimes.length === 0) return null;

  const safeIndex = Math.min(
    Math.max(0, Math.floor(currentIndex)),
    Math.max(0, allSubsectionTimes.length - 1)
  );

  const currentAllocationSeconds = allSubsectionTimes[safeIndex] ?? 0;
  if (currentAllocationSeconds <= 0) return null;

  const allocatedTimeRemainingMs = allSubsectionTimes
    .slice(safeIndex)
    .reduce((totalMs, seconds) => totalMs + seconds * 1000, 0);

  const actualTimeRemainingMs = Math.max(0, endTimeMs - currentTimeMs);

  const percentageDifference =
    allocatedTimeRemainingMs > 0
      ? (actualTimeRemainingMs - allocatedTimeRemainingMs) /
        allocatedTimeRemainingMs
      : 0;

  const currentSubsectionAllocationMs = currentAllocationSeconds * 1000;
  const updatedCurrentSubsectionAllocationMs = Math.max(
    0,
    currentSubsectionAllocationMs * (1 + percentageDifference)
  );

  const subsectionTimingAdjustmentMs =
    updatedCurrentSubsectionAllocationMs - currentSubsectionAllocationMs;

  const subsectionStartMs = currentTimeMs;
  const subsectionEndMs = Math.min(
    endTimeMs,
    subsectionStartMs + updatedCurrentSubsectionAllocationMs
  );

  return {
    currentTimeMs,
    endTimeMs,
    allocatedTimeRemainingMs,
    actualTimeRemainingMs,
    percentageDifference,
    subsectionTimingAdjustmentMs,
    updatedCurrentSubsectionAllocationMs,
    subsectionStartMs,
    subsectionEndMs,
  };
}
