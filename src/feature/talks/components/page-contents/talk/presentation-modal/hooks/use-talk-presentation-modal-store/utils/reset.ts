import { getDefaultSelectedTime } from "./getDefaultSelectedTime";

export const reset = () => {
  return {
    talkId: null,
    endTime: getDefaultSelectedTime(),
    startMs: null as number | null,
    endMs: null as number | null,
    finishDeltaMs: null as number | null,
    allSubsectionTimes: [],
    subsectionStartMs: null as number | null,
    subsectionEndMs: null as number | null,
    subsectionTimingAdjustmentPercent: null as number | null,
    subsectionTimingAdjustmentMs: null as number | null,
    currentIndex: 0,
  };
};
