import { create } from "zustand";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { toLocalDatetimeValue } from "../../utils/toLocalDatetimeValue";
import { recalculateTalkPresentationSubsectionTiming } from "../../utils/recalculateTalkPresentationSubsectionTiming";
import { initializeTalkState } from "./utils/initializeTalkState";

interface TalkPresentationModalState {
  talkId: string | null;
  selectedTime: string;
  startMs: number | null;
  endMs: number | null;
  finishDeltaMs: number | null;
  allocationsSeconds: number[];
  subsectionStartMs: number | null;
  subsectionEndMs: number | null;
  subsectionTimingAdjustmentPercent: number | null;
  subsectionTimingAdjustmentMs: number | null;
  currentIndex: number;
  setSelectedTime: (selectedTime: string) => void;
  setCurrentIndex: (currentIndex: number) => void;
  next: (maxIndex: number) => void;
  prev: () => void;
  initializeForTalk: (talk: Outline) => void;
  reset: () => void;
  start: () => void;
  finish: () => void;
}

function getDefaultSelectedTime() {
  return toLocalDatetimeValue(new Date());
}

export const useTalkPresentationModalStore = create<TalkPresentationModalState>(
  (set, get) => ({
    talkId: null,
    selectedTime: getDefaultSelectedTime(),
    startMs: null,
    endMs: null,
    finishDeltaMs: null,
    allocationsSeconds: [],
    subsectionStartMs: null,
    subsectionEndMs: null,
    subsectionTimingAdjustmentPercent: null,
    subsectionTimingAdjustmentMs: null,
    currentIndex: 0,
    setSelectedTime: (selectedTime) => set({ selectedTime }),
    setCurrentIndex: (currentIndex) => {
      const rawNextIndex = Math.max(0, Math.floor(currentIndex));
      const { endMs, allocationsSeconds } = get();
      const maxIndex = Math.max(0, allocationsSeconds.length - 1);
      const nextIndex = Math.min(rawNextIndex, maxIndex);

      if (endMs === null || allocationsSeconds.length === 0) {
        set({ currentIndex: nextIndex });
        return;
      }

      const recalculation = recalculateTalkPresentationSubsectionTiming({
        allocationsSeconds,
        currentIndex: nextIndex,
        currentTimeMs: Date.now(),
        endTimeMs: endMs,
      });

      set({
        currentIndex: nextIndex,
        subsectionStartMs: recalculation?.subsectionStartMs ?? null,
        subsectionEndMs: recalculation?.subsectionEndMs ?? null,
        subsectionTimingAdjustmentPercent:
          recalculation !== null
            ? recalculation.percentageDifference * 100
            : null,
        subsectionTimingAdjustmentMs:
          recalculation !== null
            ? recalculation.subsectionTimingAdjustmentMs
            : null,
      });
    },
    next: (maxIndex) => {
      const currentIndex = get().currentIndex;
      const safeMax = Math.max(0, Math.floor(maxIndex));
      const nextIndex = Math.min(safeMax, currentIndex + 1);
      const { endMs, allocationsSeconds } = get();

      if (endMs === null || allocationsSeconds.length === 0) {
        set({ currentIndex: nextIndex });
        return;
      }

      const recalculation = recalculateTalkPresentationSubsectionTiming({
        allocationsSeconds,
        currentIndex: nextIndex,
        currentTimeMs: Date.now(),
        endTimeMs: endMs,
      });

      set({
        currentIndex: nextIndex,
        subsectionStartMs: recalculation?.subsectionStartMs ?? null,
        subsectionEndMs: recalculation?.subsectionEndMs ?? null,
        subsectionTimingAdjustmentPercent:
          recalculation !== null
            ? recalculation.percentageDifference * 100
            : null,
        subsectionTimingAdjustmentMs:
          recalculation !== null
            ? recalculation.subsectionTimingAdjustmentMs
            : null,
      });
    },
    prev: () => {
      const currentIndex = get().currentIndex;
      const nextIndex = Math.max(0, currentIndex - 1);
      const { endMs, allocationsSeconds } = get();

      if (endMs === null || allocationsSeconds.length === 0) {
        set({ currentIndex: nextIndex });
        return;
      }

      const recalculation = recalculateTalkPresentationSubsectionTiming({
        allocationsSeconds,
        currentIndex: nextIndex,
        currentTimeMs: Date.now(),
        endTimeMs: endMs,
      });

      set({
        currentIndex: nextIndex,
        subsectionStartMs: recalculation?.subsectionStartMs ?? null,
        subsectionEndMs: recalculation?.subsectionEndMs ?? null,
        subsectionTimingAdjustmentPercent:
          recalculation !== null
            ? recalculation.percentageDifference * 100
            : null,
        subsectionTimingAdjustmentMs:
          recalculation !== null
            ? recalculation.subsectionTimingAdjustmentMs
            : null,
      });
    },
    initializeForTalk: (talk) => {
      set(initializeTalkState(talk));
    },
    reset: () => {
      set({
        talkId: null,
        selectedTime: getDefaultSelectedTime(),
        startMs: null,
        endMs: null,
        finishDeltaMs: null,
        allocationsSeconds: [],
        subsectionStartMs: null,
        subsectionEndMs: null,
        subsectionTimingAdjustmentPercent: null,
        subsectionTimingAdjustmentMs: null,
        currentIndex: 0,
      });
    },
    start: () => {
      const { selectedTime, allocationsSeconds } = get();
      const nextEndMs = new Date(selectedTime).getTime();
      if (!Number.isFinite(nextEndMs)) return;
      const nextStartMs = Date.now();
      if (nextEndMs <= nextStartMs) return;

      const recalculation = recalculateTalkPresentationSubsectionTiming({
        allocationsSeconds,
        currentIndex: 0,
        currentTimeMs: nextStartMs,
        endTimeMs: nextEndMs,
      });

      set({
        startMs: nextStartMs,
        endMs: nextEndMs,
        finishDeltaMs: null,
        subsectionStartMs: recalculation?.subsectionStartMs ?? null,
        subsectionEndMs: recalculation?.subsectionEndMs ?? null,
        subsectionTimingAdjustmentPercent:
          recalculation !== null
            ? recalculation.percentageDifference * 100
            : null,
        subsectionTimingAdjustmentMs:
          recalculation !== null
            ? recalculation.subsectionTimingAdjustmentMs
            : null,
        currentIndex: 0,
      });
    },
    finish: () => {
      const endMs = get().endMs;
      const finishDeltaMs = endMs === null ? null : Date.now() - endMs;

      set({
        startMs: null,
        endMs: null,
        finishDeltaMs,
        subsectionStartMs: null,
        subsectionEndMs: null,
        subsectionTimingAdjustmentPercent: null,
        subsectionTimingAdjustmentMs: null,
        currentIndex: 0,
      });
    },
  })
);
