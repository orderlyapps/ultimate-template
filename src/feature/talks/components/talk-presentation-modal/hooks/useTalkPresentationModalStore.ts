import { create } from "zustand";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { getTotalAllocatedSeconds } from "../utils/getTotalAllocatedSeconds";
import { toLocalDatetimeValue } from "../utils/toLocalDatetimeValue";

interface TalkPresentationModalState {
  talkId: string | null;
  selectedTime: string;
  startMs: number | null;
  endMs: number | null;
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
    currentIndex: 0,
    setSelectedTime: (selectedTime) => set({ selectedTime }),
    setCurrentIndex: (currentIndex) => {
      const nextIndex = Math.max(0, Math.floor(currentIndex));
      set({ currentIndex: nextIndex });
    },
    next: (maxIndex) => {
      const currentIndex = get().currentIndex;
      const safeMax = Math.max(0, Math.floor(maxIndex));
      set({ currentIndex: Math.min(safeMax, currentIndex + 1) });
    },
    prev: () => {
      const currentIndex = get().currentIndex;
      set({ currentIndex: Math.max(0, currentIndex - 1) });
    },
    initializeForTalk: (talk) => {
      const totalSeconds = getTotalAllocatedSeconds(talk);
      const nextDate = new Date();
      nextDate.setSeconds(nextDate.getSeconds() + totalSeconds);

      set({
        talkId: talk.id,
        selectedTime: toLocalDatetimeValue(nextDate),
        startMs: null,
        endMs: null,
        currentIndex: 0,
      });
    },
    reset: () => {
      set({
        talkId: null,
        selectedTime: getDefaultSelectedTime(),
        startMs: null,
        endMs: null,
        currentIndex: 0,
      });
    },
    start: () => {
      const { selectedTime } = get();
      const nextEndMs = new Date(selectedTime).getTime();
      if (!Number.isFinite(nextEndMs)) return;
      const nextStartMs = Date.now();
      if (nextEndMs <= nextStartMs) return;

      set({
        startMs: nextStartMs,
        endMs: nextEndMs,
        currentIndex: 0,
      });
    },
    finish: () => {
      set({
        startMs: null,
        endMs: null,
        currentIndex: 0,
      });
    },
  })
);
