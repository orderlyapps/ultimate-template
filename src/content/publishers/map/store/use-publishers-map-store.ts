import { create } from "zustand";

interface PublishersMapStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const usePublishersMapStore = create<PublishersMapStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
