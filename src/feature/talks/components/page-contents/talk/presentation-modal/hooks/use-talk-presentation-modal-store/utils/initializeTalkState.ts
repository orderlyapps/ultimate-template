import { type Outline } from "@feature/talks/state/useTalksStore";
import { getTotalAllocatedSeconds } from "../../../utils/getTotalAllocatedSeconds";
import { toLocalDatetimeValue } from "../../../utils/toLocalDatetimeValue";
import { getFlatSubsectionAllocationsSeconds } from "../../../utils/recalculateTalkPresentationSubsectionTiming";

export const initializeTalkState = (talk: Outline) => {
  const totalSeconds = getTotalAllocatedSeconds(talk);
  const nextDate = new Date();
  nextDate.setSeconds(nextDate.getSeconds() + totalSeconds);
  const allocationsSeconds = getFlatSubsectionAllocationsSeconds(talk);

  return {
    talkId: talk.id,
    selectedTime: toLocalDatetimeValue(nextDate),
    startMs: null as number | null,
    endMs: null as number | null,
    finishDeltaMs: null as number | null,
    allocationsSeconds,
    subsectionStartMs: null as number | null,
    subsectionEndMs: null as number | null,
    subsectionTimingAdjustmentPercent: null as number | null,
    subsectionTimingAdjustmentMs: null as number | null,
    currentIndex: 0,
  };
};
