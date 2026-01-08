import { create } from "zustand";
import type { Outline } from "@feature/talks/types/Outline";
import { initialisePresentation } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/actions/initialisePresentation";
import { getAdjustedSubsectionTime } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/helper/getAdjustedSubsectionTime";
import { initialState } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-store/helper/initialState";

export interface TalkPresentationState {
  isPresentationRunning: boolean;
  presentationEndTime: string;
  subsectionTimes: number[];
  currentSubsectionIndex: number;
  presentationTime: number;
  remainingPresentationTime: number;
  currentSubsection: number;
  subsectionTime: number;
  remainingSubsectionTime: number;
  initialisePresentation: (talk: Outline) => void;
  setPresentationEndTime: (presentationEndTime: string) => void;
  updateTimes: () => void;
  startPresentation: () => void;
  finishPresentation: () => void;
  nextSubsection: () => void;
  prevSubsection: () => void;
}

export const useTalkPresentationStore = create<TalkPresentationState>(
  (set, get) => ({
    ...initialState,

    initialisePresentation: (talk) => {
      set({ ...initialState, ...initialisePresentation(talk) });
    },

    setPresentationEndTime: (presentationEndTime) => {
      set({ presentationEndTime });
    },

    updateTimes: () => {
      set({
        remainingPresentationTime: get().remainingPresentationTime - 1,
        remainingSubsectionTime: get().remainingSubsectionTime - 1,
      });
    },

    startPresentation: () => {
      const presentationTime = Math.floor(
        (new Date(get().presentationEndTime).getTime() - Date.now()) / 1000
      );

      const { subsectionTime } = getAdjustedSubsectionTime(
        { ...get(), remainingPresentationTime: presentationTime },
        0
      );

      set({
        presentationTime,
        remainingPresentationTime: presentationTime,
        subsectionTime,
        remainingSubsectionTime: subsectionTime,
        isPresentationRunning: true,
      });
    },

    finishPresentation: () => {
      set(initialState);
    },

    nextSubsection: () => {
      const { currentSubsectionIndex, subsectionTime, presentationTime } =
        getAdjustedSubsectionTime(get(), 1);

      set({
        presentationTime,
        currentSubsectionIndex,
        subsectionTime,
        remainingSubsectionTime: subsectionTime,
      });
    },

    prevSubsection: () => {
      const { currentSubsectionIndex, subsectionTime, presentationTime } =
        getAdjustedSubsectionTime(get(), -1);

      set({
        presentationTime,
        currentSubsectionIndex,
        subsectionTime,
        remainingSubsectionTime: subsectionTime,
      });
    },
  })
);
