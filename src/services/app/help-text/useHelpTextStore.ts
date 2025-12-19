import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HelpTextState } from "./types";

export const useHelpTextStore = create<HelpTextState>()(
  persist(
    (set, get) => ({
      dismissedIds: new Set<string>(),
      isGloballyDisabled: false,

      dismissHelpText: (id: string) =>
        set((state) => ({
          dismissedIds: new Set(state.dismissedIds).add(id),
        })),

      toggleGlobalDisable: () =>
        set((state) => ({
          isGloballyDisabled: !state.isGloballyDisabled,
        })),

      reEnableGroup: (group: string) =>
        set((state) => {
          const newDismissedIds = new Set(
            Array.from(state.dismissedIds).filter(
              (id) => !id.startsWith(`${group}:`)
            )
          );
          return { dismissedIds: newDismissedIds };
        }),

      shouldShow: (id: string) => {
        const state = get();
        if (state.isGloballyDisabled) return false;
        return !state.dismissedIds.has(id);
      },
    }),
    {
      name: "help-text-storage",
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            state: {
              ...parsed.state,
              dismissedIds: new Set(parsed.state.dismissedIds || []),
            },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            state: {
              ...value.state,
              dismissedIds: Array.from(value.state.dismissedIds),
            },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
