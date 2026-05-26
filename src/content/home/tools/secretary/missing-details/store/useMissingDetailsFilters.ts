import { create } from "zustand";

/**
 * Type for filter keys in the missing details store
 */
type FilterKey =
  | "filterMissingPhone"
  | "filterMissingAddress"
  | "filterMissingEmail"
  | "filterMissingEmergencyContact"
  | "filterMissingBirthDate"
  | "filterMissingBaptismDate";

/**
 * State interface for the missing details filters store
 */
interface MissingDetailsFiltersState {
  /** Toggle for filtering publishers missing phone numbers */
  filterMissingPhone: boolean;
  /** Toggle for filtering publishers missing addresses */
  filterMissingAddress: boolean;
  /** Toggle for filtering publishers missing email addresses */
  filterMissingEmail: boolean;
  /** Toggle for filtering publishers missing emergency contacts */
  filterMissingEmergencyContact: boolean;
  /** Toggle for filtering publishers missing birth dates */
  filterMissingBirthDate: boolean;
  /** Toggle for filtering publishers missing baptism dates */
  filterMissingBaptismDate: boolean;
  /** Toggle a filter on/off by key */
  toggleFilter: (key: FilterKey) => void;
  /** Reset all filters to off */
  resetFilters: () => void;
}

/**
 * Zustand store for managing missing details filter state.
 * All filters are off by default, showing all publishers.
 */
export const useMissingDetailsFilters = create<MissingDetailsFiltersState>(
  (set) => ({
    filterMissingPhone: false,
    filterMissingAddress: false,
    filterMissingEmail: false,
    filterMissingEmergencyContact: false,
    filterMissingBirthDate: false,
    filterMissingBaptismDate: false,
    toggleFilter: (key: FilterKey) =>
      set((state) => ({
        ...state,
        [key]: !state[key],
      })),
    resetFilters: () =>
      set({
        filterMissingPhone: false,
        filterMissingAddress: false,
        filterMissingEmail: false,
        filterMissingEmergencyContact: false,
        filterMissingBirthDate: false,
        filterMissingBaptismDate: false,
      }),
  }),
);
