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

interface AddAddressStore {
  isAddAddressModalOpen: boolean;
  openAddAddressModal: () => void;
  closeAddAddressModal: () => void;

  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;

  suburb: Suburb | null;
  setSuburb: (suburb: Suburb | null) => void;

  street: Street | null;
  setStreet: (street: Street | null) => void;

  houseNumber: string;
  setHouseNumber: (houseNumber: string) => void;

  unitNumber: string;
  setUnitNumber: (unitNumber: string) => void;

  listType: string;
  setListType: (listType: string) => void;

  recentSuburbs: RecentSuburb[];
  addRecentSuburb: (suburb: RecentSuburb) => void;

  recentStreetsBySuburb: Record<string, RecentStreet[]>;
  addRecentStreet: (suburb: Suburb, street: RecentStreet) => void;

  resetAddressData: () => void;
}

export const useAddAddressStore = create<AddAddressStore>()(
  persist(
    (set) => ({
      isAddAddressModalOpen: false,
      openAddAddressModal: () => set({ isAddAddressModalOpen: true }),
      closeAddAddressModal: () => set({ isAddAddressModalOpen: false }),

      errorMessage: null,
      setErrorMessage: (message: string | null) => set({ errorMessage: message }),

      suburb: null,
      setSuburb: (suburb: Suburb | null) =>
        set({
          suburb,
          street: null,
          houseNumber: "",
          unitNumber: "",
          listType: "return",
        }),

      street: null,
      setStreet: (street: Street | null) =>
        set({
          street,
          houseNumber: "",
          unitNumber: "",
          listType: "return",
        }),

      houseNumber: "",
      setHouseNumber: (houseNumber: string) =>
        set({
          houseNumber,
          unitNumber: "",
          listType: "return",
        }),

      unitNumber: "",
      setUnitNumber: (unitNumber: string) => set({ unitNumber }),

      listType: "return",
      setListType: (listType: string) => set({ listType }),

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
          const filtered = currentStreets.filter((s) => s.value !== street.value);
          return {
            recentStreetsBySuburb: {
              ...state.recentStreetsBySuburb,
              [suburb.id]: [street, ...filtered].slice(0, 5),
            },
          };
        }),

      resetAddressData: () =>
        set({
          suburb: null,
          street: null,
          houseNumber: "",
          unitNumber: "",
          listType: "return",
        }),
    }),
    {
      name: "add-address-storage",
      partialize: (state) => ({
        suburb: state.suburb,
        street: state.street,
        houseNumber: state.houseNumber,
        unitNumber: state.unitNumber,
        listType: state.listType,
        recentSuburbs: state.recentSuburbs,
        recentStreetsBySuburb: state.recentStreetsBySuburb,
      }),
    },
  ),
);
