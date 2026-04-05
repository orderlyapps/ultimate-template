import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HomeAccordionId =
  | "assignments"
  | "calendar"
  | "announcements"
  | "tools"
  | "notifications";

export const DEFAULT_ACCORDION_ORDER: HomeAccordionId[] = [
  "notifications",
  "assignments",
  "calendar",
  "announcements",
  "tools",
];

export const ACCORDION_LABELS: Record<HomeAccordionId, string> = {
  assignments: "Assignments",
  calendar: "Calendar",
  announcements: "Announcements",
  tools: "Tools",
  notifications: "Notifications",
};

interface HomeAccordionOrderState {
  order: HomeAccordionId[];
  expandedIds: HomeAccordionId[];
  setOrder: (order: HomeAccordionId[]) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  setExpandedIds: (ids: HomeAccordionId[]) => void;
}

export const useHomeAccordionOrderStore = create<HomeAccordionOrderState>()(
  persist(
    (set) => ({
      order: DEFAULT_ACCORDION_ORDER,
      expandedIds: [],
      setOrder: (order) => set({ order }),
      reorder: (fromIndex, toIndex) =>
        set((state) => {
          const newOrder = [...state.order];
          const [moved] = newOrder.splice(fromIndex, 1);
          newOrder.splice(toIndex, 0, moved);
          return { order: newOrder };
        }),
      setExpandedIds: (ids) => set({ expandedIds: ids }),
    }),
    {
      name: "home-accordion-order",
      version: 1,
    },
  ),
);
