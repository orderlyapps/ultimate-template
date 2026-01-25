import type { MapboxGeocodingFeature } from "@services/vendor/mapbox/types/MapboxGeocodingResponse";
import { create } from "zustand";

interface AddSuburbModalState {
  searchQuery: string;
  searchResults: MapboxGeocodingFeature[];
  isSearching: boolean;
  selectedSuburb: MapboxGeocodingFeature | null;
  errorMessage: string | null;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: MapboxGeocodingFeature[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSelectedSuburb: (suburb: MapboxGeocodingFeature | null) => void;
  setErrorMessage: (message: string | null) => void;
  reset: () => void;
}

const initialState = {
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  selectedSuburb: null,
  errorMessage: null,
};

export const useAddSuburbModalStore = create<AddSuburbModalState>((set) => ({
  ...initialState,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSelectedSuburb: (suburb) => set({ selectedSuburb: suburb }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  reset: () => set(initialState),
}));
