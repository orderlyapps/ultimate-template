import { create } from "zustand";
import type { MapRef } from "react-map-gl/mapbox";

interface PublishersMapStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;
}

export const usePublishersMapStore = create<PublishersMapStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  mapRef: null,
  setMapRef: (ref: MapRef | null) => set({ mapRef: ref }),
}));
