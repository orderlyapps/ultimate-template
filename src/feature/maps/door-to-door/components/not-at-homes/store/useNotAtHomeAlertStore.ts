import { create } from "zustand";

interface NotAtHomeAlertState {
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export const useNotAtHomeAlertStore = create<NotAtHomeAlertState>((set) => ({
  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
