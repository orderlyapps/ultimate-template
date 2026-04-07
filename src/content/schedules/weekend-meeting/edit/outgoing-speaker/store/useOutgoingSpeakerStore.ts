import { create } from "zustand";

/**
 * State shape for the outgoing speaker assignment data.
 */
interface OutgoingSpeakerAssignment {
  speakerId: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null | undefined;
  outlineId: string | null;
  outlineTheme: string | null | undefined;
  targetCongregationId: string | null;
  targetCongregationName: string | null | undefined;
}

/**
 * Zustand store for outgoing speaker content state.
 * Manages the weekId, speakerId, and loaded assignment data.
 */
interface OutgoingSpeakerState {
  weekId: string | null;
  speakerId: string | null;
  assignment: OutgoingSpeakerAssignment | null;
  setWeekId: (weekId: string) => void;
  setSpeakerId: (speakerId: string) => void;
  setAssignment: (assignment: OutgoingSpeakerAssignment | null) => void;
  clear: () => void;
}

export const useOutgoingSpeakerStore = create<OutgoingSpeakerState>((set) => ({
  weekId: null,
  speakerId: null,
  assignment: null,
  setWeekId: (weekId) => set({ weekId }),
  setSpeakerId: (speakerId) => set({ speakerId }),
  setAssignment: (assignment) => set({ assignment }),
  clear: () => set({ weekId: null, speakerId: null, assignment: null }),
}));
