import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Map as MapType } from "@tanstack-db/map/mapSchema";

export interface MapPrintStyling {
  roadWidth: number;
  roadLabelSize: number;
  mapNameSize: number;
  mapDetailsSize: number;
  borderWidth: number;
}

interface MapPrintStore {
  isModalOpen: boolean;
  isStyleModalOpen: boolean;
  selectedMap: MapType | null;
  styling: MapPrintStyling;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsStyleModalOpen: (isOpen: boolean) => void;
  setSelectedMap: (map: MapType | null) => void;
  setStyling: (styling: Partial<MapPrintStyling>) => void;
}

const defaultStyling: MapPrintStyling = {
  roadWidth: 1,
  roadLabelSize: 1,
  mapNameSize: 18,
  mapDetailsSize: 14,
  borderWidth: 1,
};

export const useMapPrintStore = create<MapPrintStore>()(
  persist(
    (set) => ({
      isModalOpen: true,
      isStyleModalOpen: false,
      selectedMap: null,
      styling: defaultStyling,
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setIsStyleModalOpen: (isOpen) => set({ isStyleModalOpen: isOpen }),
      setSelectedMap: (map) => set({ selectedMap: map }),
      setStyling: (newStyling) =>
        set((state) => ({ styling: { ...state.styling, ...newStyling } })),
    }),
    {
      name: "map-print-store",
    }
  )
);
