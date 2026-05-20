import { create } from "zustand";

/**
 * Store for the CLAM Assignment Forms page.
 */
type ClamAssignmentFormsStore = Record<string, never>;

export const useClamAssignmentFormsStore = create<ClamAssignmentFormsStore>(
  () => ({})
);
