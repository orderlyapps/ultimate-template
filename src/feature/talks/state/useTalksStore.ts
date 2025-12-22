import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Subsection = {
  id: string;
  name: string;
  content: Record<string, unknown> | string;
  timeAllocation: number;
};

export type Section = {
  id: string;
  name: string;
  subsections: Subsection[];
};

export type Outline = {
  id: string;
  name: string;
  sections: Section[];
  createdAt: number;
  updatedAt: number;
};

export type SortOption = "updated" | "created" | "alphabetical";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

interface TalksState {
  talks: Outline[];
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
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

function createId() {
  if ("crypto" in globalThis && "randomUUID" in globalThis.crypto) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useTalksStore = create<TalksState>()(
  persist(
    (set) => ({
      talks: [],
      sortOption: "alphabetical",
      setSortOption: (sortOption) => set({ sortOption }),
      addTalk: (name) =>
        set((state) => {
          const now = Date.now();
          const newTalk: Outline = {
            id: createId(),
            name,
            sections: [],
            createdAt: now,
            updatedAt: now,
          };

          return {
            talks: [newTalk, ...state.talks],
          };
        }),
      duplicateTalk: (talkId) =>
        set((state) => {
          const now = Date.now();
          const talkIndex = state.talks.findIndex((t) => t.id === talkId);
          const talkToCopy = state.talks[talkIndex];

          if (!talkToCopy) {
            return state;
          }

          const copiedTalk: Outline = {
            ...talkToCopy,
            id: createId(),
            name: `${talkToCopy.name} copy`,
            createdAt: now,
            updatedAt: now,
            sections: talkToCopy.sections.map((section) => {
              return {
                ...section,
                id: createId(),
                subsections: section.subsections.map((ss) => ({
                  ...ss,
                  id: createId(),
                })),
              };
            }),
          };

          const nextTalks = [...state.talks];
          nextTalks.splice(talkIndex + 1, 0, copiedTalk);

          return {
            talks: nextTalks,
          };
        }),
      updateTalkName: (talkId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;
              return { ...t, name, updatedAt: now };
            }),
          };
        }),
      addSection: (talkId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: [
                  ...t.sections,
                  { id: createId(), name, subsections: [] },
                ],
                updatedAt: now,
              };
            }),
          };
        }),
      duplicateSection: (talkId, sectionIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              const sectionToCopy = t.sections[sectionIndex];
              if (!sectionToCopy) return t;

              const copiedSection: Section = {
                ...sectionToCopy,
                id: createId(),
                name: `${sectionToCopy.name} copy`,
                subsections: sectionToCopy.subsections.map((ss) => ({
                  ...ss,
                  id: createId(),
                })),
              };

              const nextSections = [...t.sections];
              nextSections.splice(sectionIndex + 1, 0, copiedSection);

              return {
                ...t,
                sections: nextSections,
                updatedAt: now,
              };
            }),
          };
        }),
      updateSectionName: (talkId, sectionId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;
                  return { ...section, name };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      addSubsection: (talkId, sectionId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  return {
                    ...section,
                    subsections: [
                      ...section.subsections,
                      {
                        id: createId(),
                        name,
                        content: "",
                        timeAllocation: 150,
                      },
                    ],
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      duplicateSubsection: (talkId, sectionId, subsectionIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  const subsectionToCopy = section.subsections[subsectionIndex];
                  if (!subsectionToCopy) return section;

                  const copiedSubsection: Subsection = {
                    ...subsectionToCopy,
                    id: createId(),
                    name: `${subsectionToCopy.name} copy`,
                  };

                  const nextSubsections = [...section.subsections];
                  nextSubsections.splice(
                    subsectionIndex + 1,
                    0,
                    copiedSubsection
                  );

                  return {
                    ...section,
                    subsections: nextSubsections,
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      updateSubsectionName: (talkId, sectionId, subsectionId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  return {
                    ...section,
                    subsections: section.subsections.map((ss) => {
                      if (ss.id !== subsectionId) return ss;
                      return { ...ss, name };
                    }),
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      updateSubsection: (talkId, sectionId, subsectionId, updates) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  return {
                    ...section,
                    subsections: section.subsections.map((ss) => {
                      if (ss.id !== subsectionId) return ss;
                      return { ...ss, ...updates };
                    }),
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      removeSubsection: (talkId, sectionId, subsectionIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  return {
                    ...section,
                    subsections: section.subsections.filter(
                      (_, i) => i !== subsectionIndex
                    ),
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      reorderSubsections: (talkId, sectionId, fromIndex, toIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.map((section) => {
                  if (section.id !== sectionId) return section;

                  const nextSubsections = [...section.subsections];
                  const [moved] = nextSubsections.splice(fromIndex, 1);

                  if (!moved) return section;

                  nextSubsections.splice(toIndex, 0, moved);

                  return {
                    ...section,
                    subsections: nextSubsections,
                  };
                }),
                updatedAt: now,
              };
            }),
          };
        }),
      removeSection: (talkId, sectionIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: t.sections.filter((_, i) => i !== sectionIndex),
                updatedAt: now,
              };
            }),
          };
        }),
      reorderSections: (talkId, fromIndex, toIndex) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              const nextSections = [...t.sections];
              const [moved] = nextSections.splice(fromIndex, 1);

              if (!moved) return t;

              nextSections.splice(toIndex, 0, moved);

              return {
                ...t,
                sections: nextSections,
                updatedAt: now,
              };
            }),
          };
        }),
      removeTalk: (id) =>
        set((state) => ({
          talks: state.talks.filter((t) => t.id !== id),
        })),
      importTalk: (talk) =>
        set((state) => {
          const now = Date.now();
          const newTalk: Outline = {
            ...talk,
            id: createId(),
            createdAt: now,
            updatedAt: now,
          };

          return {
            talks: [newTalk, ...state.talks],
          };
        }),
    }),
    {
      name: "talks-store",
      partialize: (state) => ({
        talks: state.talks,
        sortOption: state.sortOption,
      }),
      version: 3,
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
                    id: typeof ss.id === "string" ? ss.id : createId(),
                    name: typeof ss.name === "string" ? ss.name : "",
                    content: typeof ss.content === "string" ? ss.content : "",
                    timeAllocation:
                      typeof ss.timeAllocation === "number"
                        ? ss.timeAllocation
                        : 150,
                  };
                });

              return {
                id: typeof s.id === "string" ? s.id : createId(),
                name: typeof s.name === "string" ? s.name : "",
                subsections,
              };
            });

          const createdAt = typeof t.createdAt === "number" ? t.createdAt : 0;
          const updatedAt = typeof t.updatedAt === "number" ? t.updatedAt : 0;

          return {
            id: typeof t.id === "string" ? t.id : createId(),
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

        return { talks, sortOption };
      },
    }
  )
);
