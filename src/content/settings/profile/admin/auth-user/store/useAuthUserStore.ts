import { create } from "zustand";

interface AuthUserState {
  otp: string | null;
  smsPhone: string | null;
  isModalOpen: boolean;
}

interface AuthUserActions {
  setOtp: (otp: string | null) => void;
  setSmsPhone: (phone: string | null) => void;
  setIsModalOpen: (open: boolean) => void;
  openModal: (otp: string, smsPhone: string | null) => void;
  closeModal: () => void;
  reset: () => void;
}

type AuthUserStore = AuthUserState & AuthUserActions;

const initialState: AuthUserState = {
  otp: null,
  smsPhone: null,
  isModalOpen: false,
};

export const useAuthUserStore = create<AuthUserStore>((set) => ({
  ...initialState,

  setOtp: (otp) => set({ otp }),
  setSmsPhone: (smsPhone) => set({ smsPhone }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  openModal: (otp, smsPhone) => set({ otp, smsPhone, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  reset: () => set(initialState),
}));
