import { create } from "zustand";

/**
 * Store for managing Group Reports page state.
 * Extend with additional state as needed.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GroupReportsStore = {
  // Placeholder state - extend as features are added
};

export const useGroupReportsStore = create<GroupReportsStore>(() => ({}));
