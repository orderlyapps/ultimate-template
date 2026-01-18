import { create } from "zustand";
import type { MapRef } from "react-map-gl/mapbox";

interface DoorToDoorStore {
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;
  
  isMapListModalOpen: boolean;
  openMapListModal: () => void;
  closeMapListModal: () => void;
  
  selectedMapId: string | null;
  setSelectedMapId: (id: string | null) => void;
}

export const useDoorToDoorStore = create<DoorToDoorStore>((set) => ({
  mapRef: null,
  setMapRef: (ref) => set({ mapRef: ref }),
  
  isMapListModalOpen: false,
  openMapListModal: () => set({ isMapListModalOpen: true }),
  closeMapListModal: () => set({ isMapListModalOpen: false }),
  
  selectedMapId: null,
  setSelectedMapId: (id) => set({ selectedMapId: id }),
}));
