import { create } from "zustand";
import { persist } from "zustand/middleware";

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

  suburbId: string | null;
  setSuburbId: (suburbId: string | null) => void;

  streetId: string | null;
  setStreetId: (streetId: string | null) => void;

  houseNumber: string;
  setHouseNumber: (houseNumber: string) => void;

  unitNumber: string;
  setUnitNumber: (unitNumber: string) => void;

  listType: string;
  setListType: (listType: string) => void;

  recentSuburbs: RecentSuburb[];
  addRecentSuburb: (suburb: RecentSuburb) => void;

  recentStreetsBySuburb: Record<string, RecentStreet[]>;
  addRecentStreet: (suburbId: string, street: RecentStreet) => void;

  resetAddressData: () => void;
}

export const useAddAddressStore = create<AddAddressStore>()(
  persist(
    (set) => ({
      isAddAddressModalOpen: false,
      openAddAddressModal: () => set({ isAddAddressModalOpen: true }),
      closeAddAddressModal: () => set({ isAddAddressModalOpen: false }),

      suburbId: null,
      setSuburbId: (suburbId: string | null) => set({ suburbId }),

      streetId: null,
      setStreetId: (streetId: string | null) => set({ streetId }),

      houseNumber: "",
      setHouseNumber: (houseNumber: string) => set({ houseNumber }),

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
      addRecentStreet: (suburbId: string, street: RecentStreet) =>
        set((state) => {
          const currentStreets = state.recentStreetsBySuburb[suburbId] || [];
          const filtered = currentStreets.filter((s) => s.value !== street.value);
          return {
            recentStreetsBySuburb: {
              ...state.recentStreetsBySuburb,
              [suburbId]: [street, ...filtered].slice(0, 5),
            },
          };
        }),

      resetAddressData: () =>
        set({
          suburbId: null,
          streetId: null,
          houseNumber: "",
          unitNumber: "",
          listType: "return",
        }),
    }),
    {
      name: "add-address-storage",
      partialize: (state) => ({
        suburbId: state.suburbId,
        streetId: state.streetId,
        houseNumber: state.houseNumber,
        unitNumber: state.unitNumber,
        listType: state.listType,
        recentSuburbs: state.recentSuburbs,
        recentStreetsBySuburb: state.recentStreetsBySuburb,
      }),
    },
  ),
);
