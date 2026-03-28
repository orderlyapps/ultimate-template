import { create } from "zustand";

interface PublisherEditState {
  confidential_id: string;
  birth_date: string;
  baptism_date: string;
  setConfidentialId: (value: string) => void;
  setBirthDate: (value: string) => void;
  setBaptismDate: (value: string) => void;
  reset: () => void;
  initializeFromPublisher: (publisher: {
    confidential_id: string;
    birth_date?: string;
    baptism_date?: string;
  }) => void;
}

const initialState = {
  confidential_id: "",
  birth_date: "",
  baptism_date: "",
};

export const usePublisherEditStore = create<PublisherEditState>((set) => ({
  ...initialState,
  setConfidentialId: (value) => set({ confidential_id: value }),
  setBirthDate: (value) => set({ birth_date: value }),
  setBaptismDate: (value) => set({ baptism_date: value }),
  reset: () => set(initialState),
  initializeFromPublisher: (publisher) =>
    set({
      confidential_id: publisher.confidential_id,
      birth_date: publisher.birth_date ?? "",
      baptism_date: publisher.baptism_date ?? "",
    }),
}));
