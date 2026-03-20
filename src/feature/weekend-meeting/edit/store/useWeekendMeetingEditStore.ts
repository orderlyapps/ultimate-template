import { create } from "zustand";
import { speakerAssignmentCollection } from "@tanstack-db/speaker_assignment/speakerAssignmentCollection";

interface WeekendMeetingEditStore {
  weekId: string;
  setWeekId: (weekId: string) => void;

  congregationId: string | null;
  setCongregationId: (id: string | null) => void;

  hasCurrentAssignment: boolean;
  setHasCurrentAssignment: (has: boolean) => void;

  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectSpeaker: (speakerId: string, outlineId: string | null) => void;
  deleteAssignment: () => void;
}

export const useWeekendMeetingEditStore = create<WeekendMeetingEditStore>()(
  (set, get) => ({
    weekId: "",
    setWeekId: (weekId: string) => set({ weekId }),

    congregationId: null,
    setCongregationId: (id: string | null) => set({ congregationId: id }),

    hasCurrentAssignment: false,
    setHasCurrentAssignment: (has: boolean) => set({ hasCurrentAssignment: has }),

    isModalOpen: false,
    openModal: () => set({ isModalOpen: true, searchQuery: "" }),
    closeModal: () => set({ isModalOpen: false, searchQuery: "" }),

    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),

    selectSpeaker: (speakerId: string, outlineId: string | null) => {
      const { weekId, congregationId, hasCurrentAssignment } = get();
      if (!congregationId) return;

      const key = weekId + congregationId;

      if (hasCurrentAssignment) {
        speakerAssignmentCollection.update(key, (draft) => {
          draft.speaker_id = speakerId;
          draft.outline_id = outlineId;
        });
      } else {
        speakerAssignmentCollection.insert({
          week_id: weekId,
          speaker_id: speakerId,
          congregation_id: congregationId,
          outline_id: outlineId,
        });
      }

      set({ isModalOpen: false, searchQuery: "" });
    },

    deleteAssignment: () => {
      const { weekId, congregationId, hasCurrentAssignment } = get();
      if (!congregationId || !hasCurrentAssignment) return;

      const key = weekId + congregationId;
      speakerAssignmentCollection.delete(key);
    },
  }),
);
