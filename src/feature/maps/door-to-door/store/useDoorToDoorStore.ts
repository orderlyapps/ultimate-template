import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MapRef } from "react-map-gl/mapbox";
import type { Map } from "@tanstack-db/map/mapSchema";
import type { DoNotCall } from "@feature/maps/door-to-door/sources/do-not-calls/DoNotCalls";
import type { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

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

  selectedNotAtHome: NotAtHome | null;
  setSelectedNotAtHome: (notAtHome: NotAtHome | null) => void;

  selectedUnits: NotAtHome[] | null;
  setSelectedUnits: (units: NotAtHome[] | null) => void;

  selectedDoNotCallUnits: DoNotCall[] | null;
  setSelectedDoNotCallUnits: (units: DoNotCall[] | null) => void;

  isEditMode: boolean;
  setEditMode: (isEditMode: boolean) => void;
  editingMap: Map | null;
  setEditingMap: (map: Map | null) => void;

  isAddingNewMap: boolean;
  startAddingNewMap: () => void;
  stopAddingNewMap: () => void;

  newMapName: string;
  setNewMapName: (name: string) => void;
  newMapDetails: string;
  setNewMapDetails: (details: string) => void;

  isMapEditModalOpen: boolean;
  openMapEditModal: () => void;
  closeMapEditModal: () => void;

  isDrawMode: boolean;
  setIsDrawMode: (isDrawMode: boolean) => void;

  isEditingBoundary: boolean;
  setIsEditingBoundary: (isEditing: boolean) => void;
  editedBoundary: [number, number][] | null;
  setEditedBoundary: (boundary: [number, number][] | null) => void;

  editingBlockId: string | null;
  setEditingBlockId: (id: string | null) => void;
  editedBlocks: Array<{ id: string; name: string; type: "face" | "block"; coordinates: [number, number][] }> | null;
  setEditedBlocks: (blocks: Array<{ id: string; name: string; type: "face" | "block"; coordinates: [number, number][] }> | null) => void;
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
      setInlineAlert: (coords: { lat: number; lng: number } | null) =>
        set({ inlineAlert: coords }),

      selectedDoNotCall: null,
      setSelectedDoNotCall: (doNotCall: DoNotCall | null) =>
        set({ selectedDoNotCall: doNotCall }),

      selectedNotAtHome: null,
      setSelectedNotAtHome: (notAtHome: NotAtHome | null) =>
        set({ selectedNotAtHome: notAtHome }),

      selectedUnits: null,
      setSelectedUnits: (units: NotAtHome[] | null) =>
        set({ selectedUnits: units }),

      selectedDoNotCallUnits: null,
      setSelectedDoNotCallUnits: (units: DoNotCall[] | null) =>
        set({ selectedDoNotCallUnits: units }),

      isEditMode: false,
      setEditMode: (isEditMode: boolean) => set({ isEditMode }),
      editingMap: null,
      setEditingMap: (map: Map | null) => set({ editingMap: map }),

      isAddingNewMap: false,
      startAddingNewMap: () => {
        const congregationId = getUserCongregation()?.id;
        if (!congregationId) return;
        const newMap: Map = {
          id: crypto.randomUUID(),
          congregation_id: congregationId,
          name: "",
          details: null,
          boundary: null,
          blocks: null,
        };
        set({
          isAddingNewMap: true,
          editingMap: newMap,
          isEditMode: true,
          isMapEditModalOpen: true,
          newMapName: "",
          newMapDetails: "",
        });
      },
      stopAddingNewMap: () => set({ isAddingNewMap: false, newMapName: "", newMapDetails: "" }),

      newMapName: "",
      setNewMapName: (name: string) => set({ newMapName: name }),
      newMapDetails: "",
      setNewMapDetails: (details: string) => set({ newMapDetails: details }),

      isMapEditModalOpen: false,
      openMapEditModal: () => set({ isMapEditModalOpen: true }),
      closeMapEditModal: () => set({ isMapEditModalOpen: false }),

      isDrawMode: false,
      setIsDrawMode: (isDrawMode: boolean) => set({ isDrawMode }),

      isEditingBoundary: false,
      setIsEditingBoundary: (isEditing: boolean) => set({ isEditingBoundary: isEditing }),
      editedBoundary: null,
      setEditedBoundary: (boundary: [number, number][] | null) => set({ editedBoundary: boundary }),

      editingBlockId: null,
      setEditingBlockId: (id: string | null) => set({ editingBlockId: id }),
      editedBlocks: null,
      setEditedBlocks: (blocks: Array<{ id: string; name: string; type: "face" | "block"; coordinates: [number, number][] }> | null) => set({ editedBlocks: blocks }),
    }),
    {
      name: "door-to-door-storage",
      partialize: (state) => ({
        selectedMap: state.selectedMap,
        recentMaps: state.recentMaps,
      }),
    },
  ),
);
