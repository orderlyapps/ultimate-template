import { create } from "zustand";
import type { MapboxGeocodingStreetResponse } from "@services/vendor/mapbox/types/MapboxGeocodingStreetResponse";

interface AddStreetModalState {
  searchQuery: string;
  searchResults: MapboxGeocodingStreetResponse[];
  isSearching: boolean;
  selectedStreet: MapboxGeocodingStreetResponse | null;
  errorMessage: string | null;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: MapboxGeocodingStreetResponse[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSelectedStreet: (street: MapboxGeocodingStreetResponse | null) => void;
  setErrorMessage: (message: string | null) => void;
  reset: () => void;
}

const initialState = {
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  selectedStreet: null,
  errorMessage: null,
};

export const useAddStreetModalStore = create<AddStreetModalState>((set) => ({
  ...initialState,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSelectedStreet: (street) => set({ selectedStreet: street }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  reset: () => set(initialState),
}));
