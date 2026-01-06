import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Size } from "@input/size/size-select/SizeSelect";
import { addTalk } from "./actions/addTalk";
import { duplicateTalk } from "./actions/duplicateTalk";
import { updateTalkName } from "./actions/updateTalkName";
import { removeTalk } from "./actions/removeTalk";
import { importTalk } from "./actions/importTalk";
import { addSection } from "./actions/addSection";
import { duplicateSection } from "./actions/duplicateSection";
import { updateSectionName } from "./actions/updateSectionName";
import { removeSection } from "./actions/removeSection";
import { reorderSections } from "./actions/reorderSections";
import { addSubsection } from "./actions/addSubsection";
import { duplicateSubsection } from "./actions/duplicateSubsection";
import { updateSubsectionName } from "./actions/updateSubsectionName";
import { updateSubsection } from "./actions/updateSubsection";
import { removeSubsection } from "./actions/removeSubsection";
import { reorderSubsections } from "./actions/reorderSubsections";
import type { Subsection } from "@feature/talks/types/Subsection";
import type { Section } from "@feature/talks/types/Section";
import type { Outline } from "@feature/talks/types/Outline";

export type SortOption = "updated" | "created" | "alphabetical";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

interface TalksState {
  talks: Outline[];
  sortOption: SortOption;
  presentationTextSize: Size;
  setSortOption: (option: SortOption) => void;
  setPresentationTextSize: (size: Size) => void;
  addTalk: (name: string) => void;
  duplicateTalk: (talkId: string) => void;
  updateTalkName: (talkId: string, name: string) => void;
  addSection: (talkId: string, name: string) => void;
  duplicateSection: (talkId: string, sectionIndex: number) => void;
  updateSectionName: (talkId: string, sectionId: string, name: string) => void;
  addSubsection: (talkId: string, sectionId: string, name: string) => void;
  duplicateSubsection: (
    talkId: string,
    sectionId: string,
    subsectionIndex: number
  ) => void;
  updateSubsectionName: (
    talkId: string,
    sectionId: string,
    subsectionId: string,
    name: string
  ) => void;
  updateSubsection: (
    talkId: string,
    sectionId: string,
    subsectionId: string,
    updates: Partial<Pick<Subsection, "content" | "timeAllocation">>
  ) => void;
  removeSubsection: (
    talkId: string,
    sectionId: string,
    subsectionIndex: number
  ) => void;
  reorderSubsections: (
    talkId: string,
    sectionId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
  removeSection: (talkId: string, sectionIndex: number) => void;
  reorderSections: (talkId: string, fromIndex: number, toIndex: number) => void;
  removeTalk: (id: string) => void;
  importTalk: (talk: Outline) => void;
}

export const useTalksStore = create<TalksState>()(
  persist(
    (set) => ({
      talks: [],
      sortOption: "alphabetical",
      presentationTextSize: "lg",

      setSortOption: (sortOption) => set({ sortOption }),

      setPresentationTextSize: (presentationTextSize) =>
        set({ presentationTextSize }),

      addTalk: (name) => set(addTalk(name)),

      duplicateTalk: (talkId) => set(duplicateTalk(talkId)),

      updateTalkName: (talkId, name) => set(updateTalkName(talkId, name)),

      addSection: (talkId, name) => set(addSection(talkId, name)),

      duplicateSection: (talkId, sectionIndex) =>
        set(duplicateSection(talkId, sectionIndex)),

      updateSectionName: (talkId, sectionId, name) =>
        set(updateSectionName(talkId, sectionId, name)),

      addSubsection: (talkId, sectionId, name) =>
        set(addSubsection(talkId, sectionId, name)),

      duplicateSubsection: (talkId, sectionId, subsectionIndex) =>
        set(duplicateSubsection(talkId, sectionId, subsectionIndex)),

      updateSubsectionName: (talkId, sectionId, subsectionId, name) =>
        set(updateSubsectionName(talkId, sectionId, subsectionId, name)),

      updateSubsection: (talkId, sectionId, subsectionId, updates) =>
        set(updateSubsection(talkId, sectionId, subsectionId, updates)),

      removeSubsection: (talkId, sectionId, subsectionIndex) =>
        set(removeSubsection(talkId, sectionId, subsectionIndex)),

      reorderSubsections: (talkId, sectionId, fromIndex, toIndex) =>
        set(reorderSubsections(talkId, sectionId, fromIndex, toIndex)),

      removeSection: (talkId, sectionIndex) =>
        set(removeSection(talkId, sectionIndex)),

      reorderSections: (talkId, fromIndex, toIndex) =>
        set(reorderSections(talkId, fromIndex, toIndex)),

      removeTalk: (id) => set(removeTalk(id)),

      importTalk: (talk) => set(importTalk(talk)),
    }),
    {
      name: "talks-store",
      partialize: (state) => ({
        talks: state.talks,
        sortOption: state.sortOption,
        presentationTextSize: state.presentationTextSize,
      }),
      version: 4,
      migrate: (persistedState) => {
        if (!isRecord(persistedState)) {
          return { talks: [] as Outline[] };
        }

        const talksRaw = persistedState.talks;

        if (!Array.isArray(talksRaw)) {
          return { talks: [] as Outline[] };
        }

        const talks: Outline[] = talksRaw.filter(isRecord).map((t): Outline => {
          const sectionsRaw = Array.isArray(t.sections) ? t.sections : [];

          const sections: Section[] = sectionsRaw
            .filter(isRecord)
            .map((s): Section => {
              const subsectionsRaw = Array.isArray(s.subsections)
                ? s.subsections
                : [];

              const subsections: Subsection[] = subsectionsRaw
                .filter(isRecord)
                .map((ss): Subsection => {
                  return {
                    id: typeof ss.id === "string" ? ss.id : crypto.randomUUID(),
                    name: typeof ss.name === "string" ? ss.name : "",
                    content: typeof ss.content === "string" ? ss.content : "",
                    timeAllocation:
                      typeof ss.timeAllocation === "number"
                        ? ss.timeAllocation
                        : 150,
                  };
                });

              return {
                id: typeof s.id === "string" ? s.id : crypto.randomUUID(),
                name: typeof s.name === "string" ? s.name : "",
                subsections,
              };
            });

          const createdAt = typeof t.createdAt === "number" ? t.createdAt : 0;
          const updatedAt = typeof t.updatedAt === "number" ? t.updatedAt : 0;

          return {
            id: typeof t.id === "string" ? t.id : crypto.randomUUID(),
            name: typeof t.name === "string" ? t.name : "",
            sections,
            createdAt,
            updatedAt,
          };
        });

        const sortOptionRaw = persistedState.sortOption;
        let sortOption: SortOption = "alphabetical";
        if (
          sortOptionRaw === "updated" ||
          sortOptionRaw === "created" ||
          sortOptionRaw === "alphabetical"
        ) {
          sortOption = sortOptionRaw;
        }

        const presentationTextSizeRaw = persistedState.presentationTextSize;
        let presentationTextSize: Size = "xl";
        if (
          presentationTextSizeRaw === "xxs" ||
          presentationTextSizeRaw === "xs" ||
          presentationTextSizeRaw === "sm" ||
          presentationTextSizeRaw === "md" ||
          presentationTextSizeRaw === "lg" ||
          presentationTextSizeRaw === "xl" ||
          presentationTextSizeRaw === "xxl" ||
          presentationTextSizeRaw === "xxxl"
        ) {
          presentationTextSize = presentationTextSizeRaw;
        }

        return { talks, sortOption, presentationTextSize };
      },
    }
  )
);
