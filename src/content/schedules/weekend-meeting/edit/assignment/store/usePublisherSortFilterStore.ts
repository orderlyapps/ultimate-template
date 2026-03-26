import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_CONFIG,
  DEFAULT_PRESETS,
  type SortFilterConfig,
  type SortFilterPreset,
} from "./publisher-sort-filter.types";

type AssignmentConfig = {
  config: SortFilterConfig;
  presetId: string | null;
};

type PublisherSortFilterState = {
  configByAssignment: Record<string, AssignmentConfig>;
  currentAssignmentId: string | null;
  customPresets: SortFilterPreset[];
  isModalOpen: boolean;

  setCurrentAssignmentId: (assignmentId: string | null) => void;
  getActiveConfig: () => SortFilterConfig;
  getActivePresetId: () => string | null;
  setActiveConfig: (config: SortFilterConfig) => void;
  setActivePresetId: (id: string | null) => void;
  applyPreset: (preset: SortFilterPreset) => void;
  openModal: () => void;
  closeModal: () => void;

  createPreset: (name: string, config: SortFilterConfig) => SortFilterPreset;
  updatePreset: (
    id: string,
    updates: Partial<Pick<SortFilterPreset, "name" | "config">>,
  ) => void;
  duplicatePreset: (id: string) => SortFilterPreset | null;
  deletePreset: (id: string) => void;

  getAllPresets: () => SortFilterPreset[];
  hasUnsavedChanges: () => boolean;
};

export const usePublisherSortFilterStore = create<PublisherSortFilterState>()(
  persist(
    (set, get) => ({
      configByAssignment: {},
      currentAssignmentId: null,
      customPresets: [],
      isModalOpen: false,
      presetsAccordionOpen: true,

      setCurrentAssignmentId: (assignmentId) =>
        set({ currentAssignmentId: assignmentId }),

      getActiveConfig: () => {
        const { configByAssignment, currentAssignmentId } = get();
        if (!currentAssignmentId) return DEFAULT_CONFIG;
        return (
          configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG
        );
      },

      getActivePresetId: () => {
        const { configByAssignment, currentAssignmentId } = get();
        if (!currentAssignmentId) return DEFAULT_PRESETS[0].id;
        return (
          configByAssignment[currentAssignmentId]?.presetId ??
          DEFAULT_PRESETS[0].id
        );
      },

      setActiveConfig: (config) => {
        const { currentAssignmentId } = get();
        if (!currentAssignmentId) return;
        set((state) => ({
          configByAssignment: {
            ...state.configByAssignment,
            [currentAssignmentId]: {
              config,
              presetId: null,
            },
          },
        }));
      },

      setActivePresetId: (id) => {
        const { currentAssignmentId, configByAssignment } = get();
        if (!currentAssignmentId) return;
        const currentConfig =
          configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG;
        set((state) => ({
          configByAssignment: {
            ...state.configByAssignment,
            [currentAssignmentId]: {
              config: currentConfig,
              presetId: id,
            },
          },
        }));
      },

      applyPreset: (preset) => {
        const { currentAssignmentId } = get();
        if (!currentAssignmentId) return;
        set((state) => ({
          configByAssignment: {
            ...state.configByAssignment,
            [currentAssignmentId]: {
              config: { ...preset.config },
              presetId: preset.id,
            },
          },
        }));
      },

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      createPreset: (name, config) => {
        const newPreset: SortFilterPreset = {
          id: `custom-${Date.now()}`,
          name,
          config: { ...config },
          isBuiltIn: false,
        };
        set((state) => ({
          customPresets: [...state.customPresets, newPreset],
        }));
        return newPreset;
      },

      updatePreset: (id, updates) => {
        set((state) => ({
          customPresets: state.customPresets.map((preset) =>
            preset.id === id
              ? {
                  ...preset,
                  ...(updates.name !== undefined && { name: updates.name }),
                  ...(updates.config !== undefined && {
                    config: { ...updates.config },
                  }),
                }
              : preset,
          ),
        }));
      },

      duplicatePreset: (id) => {
        const allPresets = get().getAllPresets();
        const original = allPresets.find((p) => p.id === id);
        if (!original) return null;

        const newPreset: SortFilterPreset = {
          id: `custom-${Date.now()}`,
          name: `${original.name} (Copy)`,
          config: { ...original.config },
          isBuiltIn: false,
        };
        set((state) => ({
          customPresets: [...state.customPresets, newPreset],
        }));
        return newPreset;
      },

      deletePreset: (id) => {
        const { currentAssignmentId, configByAssignment } = get();
        const currentPresetId = currentAssignmentId
          ? configByAssignment[currentAssignmentId]?.presetId
          : null;

        set((state) => {
          const newConfigByAssignment = { ...state.configByAssignment };
          if (currentAssignmentId && currentPresetId === id) {
            newConfigByAssignment[currentAssignmentId] = {
              ...newConfigByAssignment[currentAssignmentId],
              presetId: null,
            };
          }
          return {
            customPresets: state.customPresets.filter(
              (preset) => preset.id !== id,
            ),
            configByAssignment: newConfigByAssignment,
          };
        });
      },

      getAllPresets: () => {
        return [...DEFAULT_PRESETS, ...get().customPresets];
      },

      hasUnsavedChanges: () => {
        const activeConfig = get().getActiveConfig();
        const activePresetId = get().getActivePresetId();
        if (!activePresetId) return true;

        const allPresets = get().getAllPresets();
        const activePreset = allPresets.find((p) => p.id === activePresetId);
        if (!activePreset) return true;

        const presetConfig = activePreset.config;
        return (
          activeConfig.sortBy !== presetConfig.sortBy ||
          activeConfig.sortDirection !== presetConfig.sortDirection ||
          activeConfig.nullValueHandling !== presetConfig.nullValueHandling ||
          activeConfig.hideWithCurrentWeekAssignment !==
            presetConfig.hideWithCurrentWeekAssignment ||
          activeConfig.hideNonParticipants !==
            presetConfig.hideNonParticipants ||
          JSON.stringify(activeConfig.filters) !==
            JSON.stringify(presetConfig.filters)
        );
      },
    }),
    {
      name: "publisher-sort-filter",
      version: 3,
      partialize: (state) => ({
        configByAssignment: state.configByAssignment,
        customPresets: state.customPresets,
      }),
    },
  ),
);
