import { create } from "zustand";

interface UpcomingMeetingsState {
  weeksToShow: number;
  incrementWeeksToShow: () => void;
}

export const useUpcomingMeetingsStore = create<UpcomingMeetingsState>()(
  (set) => ({
    weeksToShow: 1,
    incrementWeeksToShow: () =>
      set((state) => ({
        weeksToShow: Math.min(
          8,
          state.weeksToShow === 1
            ? state.weeksToShow + 1
            : state.weeksToShow + 4,
        ),
      })),
  }),
);
