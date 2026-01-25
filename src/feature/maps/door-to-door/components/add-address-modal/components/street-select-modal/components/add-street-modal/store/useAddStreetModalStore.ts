import { create } from "zustand";
import type { StreetSearchResult } from "@services/vendor/mapbox/helper/getStreets";

interface AddStreetModalState {
  searchQuery: string;
  searchResults: StreetSearchResult[];
  isSearching: boolean;
  selectedStreet: StreetSearchResult | null;
  errorMessage: string | null;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: StreetSearchResult[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSelectedStreet: (street: StreetSearchResult | null) => void;
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
