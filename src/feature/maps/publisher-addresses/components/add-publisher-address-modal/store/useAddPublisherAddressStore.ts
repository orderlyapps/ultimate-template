import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";
import type { Street } from "@tanstack-db/street/streetSchema";

interface RecentSuburb {
  value: string;
  label: string;
}

interface RecentStreet {
  value: string;
  label: string;
}

interface AddPublisherAddressStore {
  isAddAddressModalOpen: boolean;
  openAddAddressModal: () => void;
  closeAddAddressModal: () => void;

  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;

  label: string;
  setLabel: (label: string) => void;

  suburb: Suburb | null;
  setSuburb: (suburb: Suburb | null) => void;

  street: Street | null;
  setStreet: (street: Street | null) => void;

  houseNumber: string;
  setHouseNumber: (houseNumber: string) => void;

  unitNumber: string;
  setUnitNumber: (unitNumber: string) => void;

  recentSuburbs: RecentSuburb[];
  addRecentSuburb: (suburb: RecentSuburb) => void;

  recentStreetsBySuburb: Record<string, RecentStreet[]>;
  addRecentStreet: (suburb: Suburb, street: RecentStreet) => void;

  resetAddressData: () => void;
}

export const useAddPublisherAddressStore = create<AddPublisherAddressStore>()(
  persist(
    (set) => ({
      isAddAddressModalOpen: false,
      openAddAddressModal: () => set({ isAddAddressModalOpen: true }),
      closeAddAddressModal: () => set({ isAddAddressModalOpen: false }),

      errorMessage: null,
      setErrorMessage: (message: string | null) =>
        set({ errorMessage: message }),

      label: "Home",
      setLabel: (label: string) => set({ label }),

      suburb: null,
      setSuburb: (suburb: Suburb | null) =>
        set({
          suburb,
          street: null,
          houseNumber: "",
          unitNumber: "",
        }),

      street: null,
      setStreet: (street: Street | null) =>
        set({
          street,
          houseNumber: "",
          unitNumber: "",
        }),

      houseNumber: "",
      setHouseNumber: (houseNumber: string) =>
        set({
          houseNumber,
          unitNumber: "",
        }),

      unitNumber: "",
      setUnitNumber: (unitNumber: string) => set({ unitNumber }),

      recentSuburbs: [],
      addRecentSuburb: (suburb: RecentSuburb) =>
        set((state) => {
          const filtered = state.recentSuburbs.filter(
            (s) => s.value !== suburb.value,
          );
          return {
            recentSuburbs: [suburb, ...filtered].slice(0, 5),
          };
        }),

      recentStreetsBySuburb: {},
      addRecentStreet: (suburb: Suburb, street: RecentStreet) =>
        set((state) => {
          const currentStreets = state.recentStreetsBySuburb[suburb.id] || [];
          const filtered = currentStreets.filter(
            (s) => s.value !== street.value,
          );
          return {
            recentStreetsBySuburb: {
              ...state.recentStreetsBySuburb,
              [suburb.id]: [street, ...filtered].slice(0, 5),
            },
          };
        }),

      resetAddressData: () =>
        set({
          label: "Home",
          suburb: null,
          street: null,
          houseNumber: "",
          unitNumber: "",
        }),
    }),
    {
      name: "add-publisher-address-storage",
      partialize: (state) => ({
        label: state.label,
        suburb: state.suburb,
        street: state.street,
        houseNumber: state.houseNumber,
        unitNumber: state.unitNumber,
        recentSuburbs: state.recentSuburbs,
        recentStreetsBySuburb: state.recentStreetsBySuburb,
      }),
    },
  ),
);
