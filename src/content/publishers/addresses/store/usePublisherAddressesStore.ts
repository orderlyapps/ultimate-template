import { create } from "zustand";
import type { MapRef } from "react-map-gl/mapbox";

interface PublisherAddressesStore {
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;

  isAddAddressModalOpen: boolean;
  openAddAddressModal: () => void;
  closeAddAddressModal: () => void;

  selectedPublisherId: string | null;
  setSelectedPublisherId: (id: string | null) => void;
}

export const usePublisherAddressesStore = create<PublisherAddressesStore>()(
  (set) => ({
    mapRef: null,
    setMapRef: (ref: MapRef | null) => set({ mapRef: ref }),

    isAddAddressModalOpen: false,
    openAddAddressModal: () => set({ isAddAddressModalOpen: true }),
    closeAddAddressModal: () => set({ isAddAddressModalOpen: false }),

    selectedPublisherId: null,
    setSelectedPublisherId: (id: string | null) =>
      set({ selectedPublisherId: id }),
  }),
);
