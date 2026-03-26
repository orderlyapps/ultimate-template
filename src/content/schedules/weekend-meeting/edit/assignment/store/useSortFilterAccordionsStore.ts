import { create } from "zustand";
import { persist } from "zustand/middleware";

type PublisherSortFilterState = {
  presetsAccordionOpen: boolean;
  sortAccordionOpen: boolean;
  filterAccordionOpen: boolean;
  optionAccordionOpen: boolean;

  setPresetsAccordionOpen: (open: boolean) => void;
  setSortAccordionOpen: (open: boolean) => void;
  setFilterAccordionOpen: (open: boolean) => void;
  setOptionAccordionOpen: (open: boolean) => void;
};

export const useSortFilterAccordionsStore = create<PublisherSortFilterState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      presetsAccordionOpen: true,
      sortAccordionOpen: true,
      filterAccordionOpen: true,
      optionAccordionOpen: true,
      setPresetsAccordionOpen: (open) => set({ presetsAccordionOpen: open }),
      setSortAccordionOpen: (open) => set({ sortAccordionOpen: open }),
      setFilterAccordionOpen: (open) => set({ filterAccordionOpen: open }),
      setOptionAccordionOpen: (open) => set({ optionAccordionOpen: open }),
    }),
    {
      name: "weekend-meeting|sort-filter-accordions",
    },
  ),
);
