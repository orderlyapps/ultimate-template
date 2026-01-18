import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MapRef } from "react-map-gl/mapbox";

interface DoorToDoorStore {
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;

  isMapListModalOpen: boolean;
  openMapListModal: () => void;
  closeMapListModal: () => void;

  selectedMapName: string | null;
  setSelectedMapName: (id: string | null) => void;

  recentMaps: string[];
  addToRecentMaps: (mapName: string) => void;

  inlineAlert: { lat: number; lng: number } | null;
  setInlineAlert: (coords: { lat: number; lng: number } | null) => void;
}

export const useDoorToDoorStore = create<DoorToDoorStore>()(
  persist(
    (set) => ({
      mapRef: null,
      setMapRef: (ref) => set({ mapRef: ref }),

      isMapListModalOpen: false,
      openMapListModal: () => set({ isMapListModalOpen: true }),
      closeMapListModal: () => set({ isMapListModalOpen: false }),

      selectedMapName: null,
      setSelectedMapName: (id) => set({ selectedMapName: id }),

      recentMaps: [],
      addToRecentMaps: (mapName) =>
        set((state) => {
          const filtered = state.recentMaps.filter((name) => name !== mapName);
          return {
            recentMaps: [mapName, ...filtered].slice(0, 5),
          };
        }),

      inlineAlert: null,
      setInlineAlert: (coords) => set({ inlineAlert: coords }),
    }),
    {
      name: "door-to-door-storage",
      partialize: (state) => ({
        selectedMapName: state.selectedMapName,
        recentMaps: state.recentMaps,
      }),
    },
  ),
);
