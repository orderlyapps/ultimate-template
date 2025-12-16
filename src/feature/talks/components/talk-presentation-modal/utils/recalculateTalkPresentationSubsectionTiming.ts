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
  updatedCurrentSubsectionAllocationMs: number;
  subsectionStartMs: number;
  subsectionEndMs: number;
};

export function recalculateTalkPresentationSubsectionTiming(params: {
  allocationsSeconds: number[];
  currentIndex: number;
  currentTimeMs: number;
  endTimeMs: number;
}): TalkPresentationSubsectionTimingRecalculation | null {
  const { allocationsSeconds, currentIndex, currentTimeMs, endTimeMs } = params;

  if (allocationsSeconds.length === 0) return null;

  const safeIndex = Math.min(
    Math.max(0, Math.floor(currentIndex)),
    Math.max(0, allocationsSeconds.length - 1)
  );

  const currentAllocationSeconds = allocationsSeconds[safeIndex] ?? 0;
  if (currentAllocationSeconds <= 0) return null;

  const allocatedTimeRemainingMs = allocationsSeconds
    .slice(safeIndex)
    .reduce((totalMs, seconds) => totalMs + seconds * 1000, 0);

  const actualTimeRemainingMs = Math.max(0, endTimeMs - currentTimeMs);

  const percentageDifference =
    allocatedTimeRemainingMs > 0
      ? (actualTimeRemainingMs - allocatedTimeRemainingMs) /
        allocatedTimeRemainingMs
      : 0;

  const updatedCurrentSubsectionAllocationMs = Math.max(
    0,
    currentAllocationSeconds * 1000 * (1 + percentageDifference)
  );

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
    updatedCurrentSubsectionAllocationMs,
    subsectionStartMs,
    subsectionEndMs,
  };
}
