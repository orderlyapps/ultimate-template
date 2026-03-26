import { create } from "zustand";

type SchedulePdfsStore = Record<string, never>;

export const useSchedulePdfsStore = create<SchedulePdfsStore>(() => ({}));
