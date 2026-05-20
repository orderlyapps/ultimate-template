import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store for the CLAM Assignment Forms page.
 */
interface ClamAssignmentFormsStore {
  /** Default number of weeks ahead to show when navigating to the page */
  defaultWeeksAhead: number;
  /** Set the default weeks ahead value */
  setDefaultWeeksAhead: (weeks: number) => void;
}

export const useClamAssignmentFormsStore = create<ClamAssignmentFormsStore>()(
  persist(
    (set) => ({
      defaultWeeksAhead: 4,
      setDefaultWeeksAhead: (weeks) => set({ defaultWeeksAhead: weeks }),
    }),
    {
      name: "clam-assignment-forms-settings",
    }
  )
);
