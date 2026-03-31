import { create } from "zustand";
import type { MapRef } from "react-map-gl/mapbox";

export type HouseholdMember = {
  publisher_id: string;
  address_id: string;
  label: string;
};

interface PublishersMapStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  mapRef: MapRef | null;
  setMapRef: (ref: MapRef | null) => void;
  selectedHousehold: HouseholdMember[] | null;
  openHouseholdModal: (members: HouseholdMember[]) => void;
  closeHouseholdModal: () => void;
}

export const usePublishersMapStore = create<PublishersMapStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  mapRef: null,
  setMapRef: (ref: MapRef | null) => set({ mapRef: ref }),
  selectedHousehold: null,
  openHouseholdModal: (members) => set({ selectedHousehold: members }),
  closeHouseholdModal: () => set({ selectedHousehold: null }),
}));
