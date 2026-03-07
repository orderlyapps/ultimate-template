import { create } from "zustand";
import type { Map as MapType } from "@tanstack-db/map/mapSchema";

interface MapPrintStore {
  isModalOpen: boolean;
  selectedMap: MapType | null;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedMap: (map: MapType | null) => void;
}

export const useMapPrintStore = create<MapPrintStore>((set) => ({
  isModalOpen: true,
  selectedMap: null,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setSelectedMap: (map) => set({ selectedMap: map }),
}));
