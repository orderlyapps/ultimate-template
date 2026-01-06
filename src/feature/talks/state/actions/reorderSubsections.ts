import type { Outline } from "../../types/Outline";

export const reorderSubsections =
  (talkId: string, sectionId: string, fromIndex: number, toIndex: number) =>
  (state: { talks: Outline[] }) => {
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
  };
