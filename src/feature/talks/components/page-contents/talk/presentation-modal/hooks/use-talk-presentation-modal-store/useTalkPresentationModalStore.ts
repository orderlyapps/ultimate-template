import { create } from "zustand";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { initializeTalkState } from "./utils/initializeTalkState";
import { getDefaultSelectedTime } from "./utils/getDefaultSelectedTime";
import { setEndTime as setEndTimeUtil } from "./utils/setEndTime";
import { setCurrentIndex as setCurrentIndexUtil } from "./utils/setCurrentIndex";
import { next as nextUtil } from "./utils/next";
import { prev as prevUtil } from "./utils/prev";
import { reset as resetUtil } from "./utils/reset";
import { start as startUtil } from "./utils/start";
import { finish as finishUtil } from "./utils/finish";

interface TalkPresentationModalState {
  talkId: string | null;
  endTime: string;
  startMs: number | null;
  endMs: number | null;
  finishDeltaMs: number | null;
  allSubsectionTimes: number[];
  subsectionStartMs: number | null;
  subsectionEndMs: number | null;
  subsectionTimingAdjustmentPercent: number | null;
  subsectionTimingAdjustmentMs: number | null;
  currentIndex: number;
  setEndTime: (selectedTime: string) => void;
  setCurrentIndex: (currentIndex: number) => void;
  next: (maxIndex: number) => void;
  prev: () => void;
  initializeForTalk: (talk: Outline) => void;
  reset: () => void;
  start: () => void;
  finish: () => void;
}

export const useTalkPresentationModalStore = create<TalkPresentationModalState>(
  (set, get) => ({
    talkId: null,
    endTime: getDefaultSelectedTime(),
    startMs: null,
    endMs: null,
    finishDeltaMs: null,
    allSubsectionTimes: [],
    subsectionStartMs: null,
    subsectionEndMs: null,
    subsectionTimingAdjustmentPercent: null,
    subsectionTimingAdjustmentMs: null,
    currentIndex: 0,
    setEndTime: (selectedTime) => set(setEndTimeUtil(selectedTime)),
    setCurrentIndex: (currentIndex) => {
      const { endMs, allSubsectionTimes } = get();
      set(setCurrentIndexUtil({ currentIndex, endMs, allSubsectionTimes }));
    },
    next: (maxIndex) => {
      const { currentIndex, endMs, allSubsectionTimes } = get();
      set(nextUtil({ currentIndex, maxIndex, endMs, allSubsectionTimes }));
    },
    prev: () => {
      const { currentIndex, endMs, allSubsectionTimes } = get();
      set(prevUtil({ currentIndex, endMs, allSubsectionTimes }));
    },
    initializeForTalk: (talk) => {
      set(initializeTalkState(talk));
    },
    reset: () => {
      set(resetUtil());
    },
    start: () => {
      const { endTime, allSubsectionTimes } = get();
      const result = startUtil({ endTime, allSubsectionTimes });
      if (result) set(result);
    },
    finish: () => {
      const { endMs } = get();
      set(finishUtil({ endMs }));
    },
  })
);
