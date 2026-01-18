import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MapRef } from "react-map-gl/mapbox";
import type { Map } from "@tanstack-db/map/mapSchema";
import type { DoNotCall } from "@feature/maps/door-to-door/components/sources/do-not-calls/DoNotCalls";

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

  selectedDoNotCall: DoNotCall | null;
  setSelectedDoNotCall: (doNotCall: DoNotCall | null) => void;
}

export const useDoorToDoorStore = create<DoorToDoorStore>()(
  persist(
    (set) => ({
      mapRef: null,
      setMapRef: (ref: MapRef | null) => set({ mapRef: ref }),

      isMapListModalOpen: false,
      openMapListModal: () => set({ isMapListModalOpen: true }),
      closeMapListModal: () => set({ isMapListModalOpen: false }),

      selectedMap: null,
      setSelectedMap: (map: Map | null) => set({ selectedMap: map }),

      recentMaps: [],
      addToRecentMaps: (newMap: Map) =>
        set((state) => {
          const filtered = state.recentMaps.filter(
            (map) => map.id !== newMap.id,
          );
          return {
            recentMaps: [newMap, ...filtered].slice(0, 5),
          };
        }),

      inlineAlert: null,
      setInlineAlert: (coords: { lat: number; lng: number } | null) => set({ inlineAlert: coords }),

      selectedDoNotCall: null,
      setSelectedDoNotCall: (doNotCall: DoNotCall | null) =>
        set({ selectedDoNotCall: doNotCall }),
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
