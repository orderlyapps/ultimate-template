import { create } from "zustand";

interface UpcomingWeekendMeetingsState {
  weeksToShow: number;
  incrementWeeksToShow: () => void;
}

export const useUpcomingWeekendMeetingsStore =
  create<UpcomingWeekendMeetingsState>()((set) => ({
    weeksToShow: 1,
    incrementWeeksToShow: () =>
      set((state) => ({
        weeksToShow: Math.min(
          8,
          state.weeksToShow === 1
            ? state.weeksToShow + 1
            : state.weeksToShow + 4
        ),
      })),
  }));
