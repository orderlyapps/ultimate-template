import { create } from "zustand";
import { persist } from "zustand/middleware";

type AddMemberFilterState = {
  showUnassignedOnly: boolean;
  toggleShowUnassignedOnly: () => void;
};

export const useAddMemberFilterStore = create<AddMemberFilterState>()(
  persist(
    (set) => ({
      showUnassignedOnly: true,
      toggleShowUnassignedOnly: () =>
        set((state) => ({ showUnassignedOnly: !state.showUnassignedOnly })),
    }),
    {
      name: "add-member-filter-storage",
    }
  )
);
