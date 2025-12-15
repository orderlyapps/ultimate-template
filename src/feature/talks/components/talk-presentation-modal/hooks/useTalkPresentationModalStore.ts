import { create } from "zustand";
import type { Outline } from "@feature/talks/state/useTalksStore";
import { getTotalAllocatedSeconds } from "../utils/getTotalAllocatedSeconds";
import { toLocalDatetimeValue } from "../utils/toLocalDatetimeValue";

interface TalkPresentationModalState {
  talkId: string | null;
  selectedTime: string;
  startMs: number | null;
  endMs: number | null;
  setSelectedTime: (selectedTime: string) => void;
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
    setSelectedTime: (selectedTime) => set({ selectedTime }),
    initializeForTalk: (talk) => {
      const totalSeconds = getTotalAllocatedSeconds(talk);
      const nextDate = new Date();
      nextDate.setSeconds(nextDate.getSeconds() + totalSeconds);

      set({
        talkId: talk.id,
        selectedTime: toLocalDatetimeValue(nextDate),
        startMs: null,
        endMs: null,
      });
    },
    reset: () => {
      set({
        talkId: null,
        selectedTime: getDefaultSelectedTime(),
        startMs: null,
        endMs: null,
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
      });
    },
    finish: () => {
      set({
        startMs: null,
        endMs: null,
      });
    },
  })
);
