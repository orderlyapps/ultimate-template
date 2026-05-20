import { create } from "zustand";

type ModalType = "midweek" | "weekend" | "audio-video" | "cleaning" | null;

type SchedulePdfsStore = {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  selectedMonth: {
    firstMonday: string;
    lastMonday: string;
  } | null;
  setSelectedMonth: (month: { firstMonday: string; lastMonday: string }) => void;
};

export const useSchedulePdfsStore = create<SchedulePdfsStore>((set) => ({
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal, selectedMonth: null }),
  selectedMonth: null,
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
