import { create } from "zustand";
import type {
  PublisherFilterState,
  UserFilterPreset,
} from "@/content/publishers/lists/components/publisher-lists-modals/components/preset-selection-modal/publisherFilterState";
import { defaultFilters } from "@/content/publishers/lists/components/publisher-lists-modals/components/preset-selection-modal/publisherFilterState";

interface PublisherListsState {
  isAddModalOpen: boolean;
  isFilterModalOpen: boolean;
  isPresetModalOpen: boolean;
  pendingImportFile: File | null;
  searchQuery: string;
  activePresetName: string;
  filters: PublisherFilterState;
  userPresets: UserFilterPreset[];
}

interface PublisherListsActions {
  setIsAddModalOpen: (open: boolean) => void;
  setIsFilterModalOpen: (open: boolean) => void;
  setIsPresetModalOpen: (open: boolean) => void;
  setPendingImportFile: (file: File | null) => void;
  setSearchQuery: (query: string) => void;
  setActivePresetName: (name: string) => void;
  setFilters: (filters: PublisherFilterState) => void;
  setUserPresets: (presets: UserFilterPreset[]) => void;
  savePreset: (name: string, filters: PublisherFilterState) => void;
  renamePreset: (id: string, newName: string) => void;
  duplicatePreset: (id: string) => void;
  deletePreset: (id: string) => void;
  applyPreset: (filters: PublisherFilterState, name: string) => void;
  hasActiveFilters: () => boolean;
}

type PublisherListsStore = PublisherListsState & PublisherListsActions;

export const usePublisherListsStore = create<PublisherListsStore>(
  (set, get) => ({
    isAddModalOpen: false,
    isFilterModalOpen: false,
    isPresetModalOpen: false,
    pendingImportFile: null,
    searchQuery: "",
    activePresetName: "All Publishers",
    filters: defaultFilters,
    userPresets: [],

    setIsAddModalOpen: (open) => set({ isAddModalOpen: open }),
    setIsFilterModalOpen: (open) => set({ isFilterModalOpen: open }),
    setIsPresetModalOpen: (open) => set({ isPresetModalOpen: open }),
    setPendingImportFile: (file) => set({ pendingImportFile: file }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setActivePresetName: (name) => set({ activePresetName: name }),
    setFilters: (filters) => set({ filters }),
    setUserPresets: (presets) => set({ userPresets: presets }),

    savePreset: (name, filters) => {
      const newPreset: UserFilterPreset = {
        id: crypto.randomUUID(),
        name,
        filters,
      };
      set((state) => ({ userPresets: [...state.userPresets, newPreset] }));
    },

    renamePreset: (id, newName) => {
      set((state) => ({
        userPresets: state.userPresets.map((p) =>
          p.id === id ? { ...p, name: newName } : p
        ),
      }));
    },

    duplicatePreset: (id) => {
      const preset = get().userPresets.find((p) => p.id === id);
      if (!preset) return;
      const copy: UserFilterPreset = {
        id: crypto.randomUUID(),
        name: `${preset.name} (copy)`,
        filters: { ...preset.filters },
      };
      set((state) => ({ userPresets: [...state.userPresets, copy] }));
    },

    deletePreset: (id) => {
      set((state) => ({
        userPresets: state.userPresets.filter((p) => p.id !== id),
      }));
    },

    applyPreset: (filters, name) => {
      set({ filters, activePresetName: name });
    },

    hasActiveFilters: () => {
      const { filters } = get();
      return (
        filters.standing.length > 0 ||
        filters.type.length > 0 ||
        filters.gender.length > 0 ||
        filters.group.length > 0
      );
    },
  })
);
