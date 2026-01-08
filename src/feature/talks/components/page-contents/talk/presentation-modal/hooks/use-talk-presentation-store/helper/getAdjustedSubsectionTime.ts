import type { TalkPresentationState } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/useTalkPresentationStore";

export const getAdjustedSubsectionTime = (
  {
    remainingPresentationTime, subsectionTimes, currentSubsectionIndex,
  }: TalkPresentationState,
  direction: number
) => {
  const remainingSubsectionsTime = subsectionTimes
    .slice(currentSubsectionIndex + direction)
    .reduce((a, b) => a + b, 0);

  const subsectionTime = subsectionTimes[currentSubsectionIndex + direction];

  const subsectionTimeRatio = remainingPresentationTime / remainingSubsectionsTime;

  return {
    presentationTime: remainingPresentationTime,
    subsectionTime: subsectionTime * subsectionTimeRatio,
    currentSubsectionIndex: currentSubsectionIndex + direction,
  };
};
