import { create } from "zustand";
import { persist } from "zustand/middleware";

function extractWeekId(key: string): string | null {
  const match = key.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

type DismissedAssignmentsState = {
  dismissedKeys: Set<string>;
  dismiss: (key: string) => void;
  dismissAll: (keys: string[]) => void;
  isDismissed: (key: string) => boolean;
  cleanup: (currentWeekId: string) => void;
};

export const useDismissedAssignmentsStore =
  create<DismissedAssignmentsState>()(
    persist(
      (set, get) => ({
        dismissedKeys: new Set<string>(),

        dismiss: (key: string) =>
          set((state) => ({
            dismissedKeys: new Set(state.dismissedKeys).add(key),
          })),

        dismissAll: (keys: string[]) =>
          set((state) => {
            const next = new Set(state.dismissedKeys);
            for (const key of keys) next.add(key);
            return { dismissedKeys: next };
          }),

        isDismissed: (key: string) => get().dismissedKeys.has(key),

        cleanup: (currentWeekId: string) =>
          set((state) => {
            const pruned = new Set(
              Array.from(state.dismissedKeys).filter((key) => {
                const weekId = extractWeekId(key);
                return !weekId || weekId >= currentWeekId;
              }),
            );
            if (pruned.size === state.dismissedKeys.size) return state;
            return { dismissedKeys: pruned };
          }),
      }),
      {
        name: "dismissed-assignments-storage",
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const parsed = JSON.parse(str);
            return {
              state: {
                ...parsed.state,
                dismissedKeys: new Set(parsed.state.dismissedKeys || []),
              },
            };
          },
          setItem: (name, value) => {
            const toStore = {
              state: {
                ...value.state,
                dismissedKeys: Array.from(value.state.dismissedKeys),
              },
            };
            localStorage.setItem(name, JSON.stringify(toStore));
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      },
    ),
  );
