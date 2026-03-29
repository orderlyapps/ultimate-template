import { create } from "zustand";
import type { Phone, Address, Email, EmergencyContact } from "@state/rxdb/collections/publisher";

type PhoneItem = Phone extends (infer U)[] | undefined ? U : never;
type AddressItem = Address extends (infer U)[] | undefined ? U : never;
type EmailItem = Email extends (infer U)[] | undefined ? U : never;
type EmergencyContactItem = EmergencyContact extends (infer U)[] | undefined ? U : never;

interface PublisherEditState {
  confidential_id: string;
  birth_date: string;
  baptism_date: string;
  phone: PhoneItem[];
  address: AddressItem[];
  email: EmailItem[];
  emergency_contact: EmergencyContactItem[];
  setConfidentialId: (value: string) => void;
  setBirthDate: (value: string) => void;
  setBaptismDate: (value: string) => void;
  setPhone: (value: PhoneItem[]) => void;
  setAddress: (value: AddressItem[]) => void;
  setEmail: (value: EmailItem[]) => void;
  setEmergencyContact: (value: EmergencyContactItem[]) => void;
  addPhone: (item: PhoneItem) => void;
  updatePhone: (id: string, item: Partial<PhoneItem>) => void;
  removePhone: (id: string) => void;
  addAddress: (item: AddressItem) => void;
  updateAddress: (id: string, item: Partial<AddressItem>) => void;
  removeAddress: (id: string) => void;
  addEmail: (item: EmailItem) => void;
  updateEmail: (id: string, item: Partial<EmailItem>) => void;
  removeEmail: (id: string) => void;
  addEmergencyContact: (item: EmergencyContactItem) => void;
  updateEmergencyContact: (id: string, item: Partial<EmergencyContactItem>) => void;
  removeEmergencyContact: (id: string) => void;
  reset: () => void;
  initializeFromPublisher: (publisher: {
    confidential_id: string;
    birth_date?: string;
    baptism_date?: string;
    phone?: PhoneItem[];
    address?: AddressItem[];
    email?: EmailItem[];
    emergency_contact?: EmergencyContactItem[];
  }) => void;
}

export type { PhoneItem, AddressItem, EmailItem, EmergencyContactItem };

const initialState = {
  confidential_id: "",
  birth_date: "",
  baptism_date: "",
  phone: [] as PhoneItem[],
  address: [] as AddressItem[],
  email: [] as EmailItem[],
  emergency_contact: [] as EmergencyContactItem[],
};

export const usePublisherEditStore = create<PublisherEditState>((set) => ({
  ...initialState,
  setConfidentialId: (value) => set({ confidential_id: value }),
  setBirthDate: (value) => set({ birth_date: value }),
  setBaptismDate: (value) => set({ baptism_date: value }),
  setPhone: (value) => set({ phone: value }),
  setAddress: (value) => set({ address: value }),
  setEmail: (value) => set({ email: value }),
  setEmergencyContact: (value) => set({ emergency_contact: value }),
  addPhone: (item) => set((state) => ({ phone: [...state.phone, item] })),
  updatePhone: (id, item) =>
    set((state) => ({
      phone: state.phone.map((p) => (p.id === id ? { ...p, ...item } : p)),
    })),
  removePhone: (id) =>
    set((state) => ({ phone: state.phone.filter((p) => p.id !== id) })),
  addAddress: (item) => set((state) => ({ address: [...state.address, item] })),
  updateAddress: (id, item) =>
    set((state) => ({
      address: state.address.map((a) => (a.id === id ? { ...a, ...item } : a)),
    })),
  removeAddress: (id) =>
    set((state) => ({ address: state.address.filter((a) => a.id !== id) })),
  addEmail: (item) => set((state) => ({ email: [...state.email, item] })),
  updateEmail: (id, item) =>
    set((state) => ({
      email: state.email.map((e) => (e.id === id ? { ...e, ...item } : e)),
    })),
  removeEmail: (id) =>
    set((state) => ({ email: state.email.filter((e) => e.id !== id) })),
  addEmergencyContact: (item) =>
    set((state) => ({ emergency_contact: [...state.emergency_contact, item] })),
  updateEmergencyContact: (id, item) =>
    set((state) => ({
      emergency_contact: state.emergency_contact.map((ec) =>
        ec.id === id ? { ...ec, ...item } : ec
      ),
    })),
  removeEmergencyContact: (id) =>
    set((state) => ({
      emergency_contact: state.emergency_contact.filter((ec) => ec.id !== id),
    })),
  reset: () => set(initialState),
  initializeFromPublisher: (publisher) =>
    set({
      confidential_id: publisher.confidential_id,
      birth_date: publisher.birth_date ?? "",
      baptism_date: publisher.baptism_date ?? "",
      phone: publisher.phone ?? [],
      address: publisher.address ?? [],
      email: publisher.email ?? [],
      emergency_contact: publisher.emergency_contact ?? [],
    }),
}));
