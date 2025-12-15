import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Subsection = {
  name: string;
  content: string;
  timeAllocation: number;
};

export type Section = {
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

interface TalksState {
  talks: Outline[];
  addTalk: (name: string) => void;
  addSection: (talkId: string, name: string) => void;
  removeTalk: (id: string) => void;
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
      addSection: (talkId, name) =>
        set((state) => {
          const now = Date.now();

          return {
            talks: state.talks.map((t) => {
              if (t.id !== talkId) return t;

              return {
                ...t,
                sections: [...t.sections, { name, subsections: [] }],
                updatedAt: now,
              };
            }),
          };
        }),
      removeTalk: (id) =>
        set((state) => ({
          talks: state.talks.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "talks-store",
    }
  )
);
