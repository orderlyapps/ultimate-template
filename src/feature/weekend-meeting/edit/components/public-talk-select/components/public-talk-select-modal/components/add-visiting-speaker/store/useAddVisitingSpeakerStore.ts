import { create } from "zustand";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";

type Step = "congregation" | "details" | "outlines";

interface AddVisitingSpeakerStore {
  isOpen: boolean;
  step: Step;

  congregationId: string | null;
  congregationName: string;

  firstName: string;
  lastName: string;

  speakerId: string | null;
  selectedOutlineIds: string[];

  open: () => void;
  close: () => void;
  reset: () => void;

  setCongregation: (id: string, name: string) => void;

  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;

  toggleOutline: (outlineId: string) => void;

  goToStep: (step: Step) => void;
  goNext: () => void;
  goBack: () => void;

  createSpeaker: () => void;
  submitOutlines: () => void;
}

const initialState = {
  isOpen: false,
  step: "congregation" as Step,
  congregationId: null as string | null,
  congregationName: "",
  firstName: "",
  lastName: "",
  speakerId: null as string | null,
  selectedOutlineIds: [] as string[],
};

export const useAddVisitingSpeakerStore = create<AddVisitingSpeakerStore>()(
  (set, get) => ({
    ...initialState,

    open: () => set({ isOpen: true }),
    close: () => set(initialState),
    reset: () => set(initialState),

    setCongregation: (id: string, name: string) =>
      set({ congregationId: id, congregationName: name }),

    setFirstName: (name: string) => set({ firstName: name }),
    setLastName: (name: string) => set({ lastName: name }),

    toggleOutline: (outlineId: string) => {
      const { selectedOutlineIds } = get();
      if (selectedOutlineIds.includes(outlineId)) {
        set({ selectedOutlineIds: selectedOutlineIds.filter((id) => id !== outlineId) });
      } else {
        set({ selectedOutlineIds: [...selectedOutlineIds, outlineId] });
      }
    },

    goToStep: (step: Step) => set({ step }),

    goNext: () => {
      const { step } = get();
      if (step === "congregation") set({ step: "details" });
    },

    goBack: () => {
      const { step } = get();
      if (step === "details") set({ step: "congregation" });
    },

    createSpeaker: () => {
      const { congregationId, firstName, lastName } = get();
      if (!congregationId) return;

      const speakerId = crypto.randomUUID();
      publisherCollection.insert({
        id: speakerId,
        congregation_id: congregationId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        display_name: null,
        middle_name: null,
        family_id: null,
        group_id: null,
        gender: "male",
        standing: "elder",
        type: "speaker",
      });

      set({ speakerId, step: "outlines" });
    },

    submitOutlines: () => {
      const { speakerId, selectedOutlineIds } = get();
      if (!speakerId) return;

      selectedOutlineIds.forEach((outlineId) => {
        speakerOutlineCollection.insert({
          speaker_id: speakerId,
          outline_id: outlineId,
        });
      });

      set(initialState);
    },
  }),
);
