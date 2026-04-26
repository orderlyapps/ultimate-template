import { create } from "zustand";

interface Suburb {
  id: string;
  name: string;
}

interface Street {
  id: string;
  name: string;
  suburb_id: string;
}

interface AddEditAddressState {
  label: string;
  suburb: Suburb | null;
  street: Street | null;
  houseNumber: string;
  unitNumber: string;
  setLabel: (value: string) => void;
  setSuburb: (value: Suburb | null) => void;
  setStreet: (value: Street | null) => void;
  setHouseNumber: (value: string) => void;
  setUnitNumber: (value: string) => void;
  resetForm: () => void;
  initializeForm: (existingAddress?: {
    label?: string;
    suburb?: string;
    street?: string;
    house_number?: string;
    unit_number?: string;
  } | null, suburbs?: Suburb[], streets?: Street[]) => void;
}

const initialState = {
  label: "Home",
  suburb: null as Suburb | null,
  street: null as Street | null,
  houseNumber: "",
  unitNumber: "",
};

export const useAddEditAddressStore = create<AddEditAddressState>((set) => ({
  ...initialState,
  setLabel: (value) => set({ label: value }),
  setSuburb: (value) =>
    set({
      suburb: value,
      street: null,
      houseNumber: "",
      unitNumber: "",
    }),
  setStreet: (value) =>
    set({
      street: value,
      houseNumber: "",
      unitNumber: "",
    }),
  setHouseNumber: (value) => set({ houseNumber: value }),
  setUnitNumber: (value) => set({ unitNumber: value }),
  resetForm: () => set(initialState),
  initializeForm: (existingAddress, suburbs, streets) => {
    const existingSuburb = existingAddress?.suburb
      ? suburbs?.find((s) => s.name === existingAddress.suburb) ?? null
      : null;

    const existingStreet = existingAddress?.street && existingSuburb
      ? streets?.find(
          (s) =>
            s.name === existingAddress.street &&
            s.suburb_id === existingSuburb.id
        ) ?? null
      : null;

    set({
      label: existingAddress?.label ?? "Home",
      suburb: existingSuburb,
      street: existingStreet,
      houseNumber: existingAddress?.house_number ?? "",
      unitNumber: existingAddress?.unit_number ?? "",
    });
  },
}));
