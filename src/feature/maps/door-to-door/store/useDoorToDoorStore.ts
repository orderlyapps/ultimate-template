import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MapRef } from "react-map-gl/mapbox";
import type { Map } from "@tanstack-db/map/mapSchema";

interface DoorToDoorStore {
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;

  isMapListModalOpen: boolean;
  openMapListModal: () => void;
  closeMapListModal: () => void;

  selectedMap: Map | null;
  setSelectedMap: (map: Map | null) => void;

  recentMaps: Map[];
  addToRecentMaps: (map: Map) => void;

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

      selectedMap: null,
      setSelectedMap: (map) => set({ selectedMap: map }),

      recentMaps: [],
      addToRecentMaps: (map) =>
        set((state) => {
          const filtered = state.recentMaps.filter((map) => map.id !== map.id);
          return {
            recentMaps: [map, ...filtered].slice(0, 5),
          };
        }),

      inlineAlert: null,
      setInlineAlert: (coords) => set({ inlineAlert: coords }),
    }),
    {
      name: "door-to-door-storage",
      partialize: (state) => ({
        selectedMapName: state.selectedMap,
        recentMaps: state.recentMaps,
      }),
    },
  ),
);
