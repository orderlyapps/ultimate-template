import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  isFeatureEnabled,
  type AppFeatureId,
  type FeatureGroupId,
  type FeatureGroupOverrides,
  type FeatureOverrides,
} from "@services/app/features/app-features";

interface AppFeaturesState {
  featureOverrides: FeatureOverrides;
  groupOverrides: FeatureGroupOverrides;
  setFeatureEnabled: (featureId: AppFeatureId, enabled: boolean) => void;
  setGroupEnabled: (groupId: FeatureGroupId, enabled: boolean) => void;
  resetAll: () => void;
  isEnabled: (featureId: AppFeatureId) => boolean;
}

export const useAppFeaturesStore = create<AppFeaturesState>()(
  persist(
    (set, get) => ({
      featureOverrides: {},
      groupOverrides: {},
      setFeatureEnabled: (featureId, enabled) =>
        set((state) => ({
          featureOverrides: {
            ...state.featureOverrides,
            [featureId]: enabled,
          },
        })),
      setGroupEnabled: (groupId, enabled) =>
        set((state) => ({
          groupOverrides: {
            ...state.groupOverrides,
            [groupId]: enabled,
          },
        })),
      resetAll: () =>
        set({
          featureOverrides: {},
          groupOverrides: {},
        }),
      isEnabled: (featureId) => {
        const { featureOverrides, groupOverrides } = get();
        return isFeatureEnabled({ featureId, featureOverrides, groupOverrides });
      },
    }),
    {
      name: "app-features",
      partialize: (state) => ({
        featureOverrides: state.featureOverrides,
        groupOverrides: state.groupOverrides,
      }),
      version: 1,
    }
  )
);
