import { create } from "zustand";
import type { SuburbSearchResult } from "@services/vendor/mapbox/helper/getSuburbs";

interface AddSuburbModalState {
  searchQuery: string;
  searchResults: SuburbSearchResult[];
  isSearching: boolean;
  selectedSuburb: SuburbSearchResult | null;
  errorMessage: string | null;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SuburbSearchResult[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSelectedSuburb: (suburb: SuburbSearchResult | null) => void;
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
