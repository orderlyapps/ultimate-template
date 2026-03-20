import type { PublisherStanding } from "@tanstack-db/publisher/standingSchema";
import type { PublisherType } from "@tanstack-db/publisher/typeSchema";
import type { PublisherGender } from "@tanstack-db/publisher/genderSchema";

export interface PublisherFilterState {
  standing: PublisherStanding[];
  type: PublisherType[];
  gender: PublisherGender[];
  group: string[];
}

export const defaultFilters: PublisherFilterState = {
  standing: [],
  type: [],
  gender: [],
  group: [],
};

export interface UserFilterPreset {
  id: string;
  name: string;
  filters: PublisherFilterState;
}

export interface BuiltInPreset {
  id: string;
  name: string;
  filters: PublisherFilterState;
}

export const builtInPresets: BuiltInPreset[] = [
  {
    id: "regular_pioneers",
    name: "Regular Pioneers",
    filters: { ...defaultFilters, type: ["regular_pioneer"] },
  },
  {
    id: "ministerial_servants",
    name: "Ministerial Servants",
    filters: {
      ...defaultFilters,
      standing: ["ministerial_servant"],
      type: ["continuous_auxilary", "publisher", "regular_pioneer"],
    },
  },
  {
    id: "elders",
    name: "Elders",
    filters: {
      ...defaultFilters,
      standing: ["elder"],
      type: ["continuous_auxilary", "publisher", "regular_pioneer"],
    },
  },
  {
    id: "baptised_brothers",
    name: "Baptised Brothers",
    filters: {
      ...defaultFilters,
      standing: ["publisher"],
      type: ["continuous_auxilary", "regular_pioneer", "publisher"],
      gender: ["male"],
    },
  },
  {
    id: "baptised_sisters",
    name: "Baptised Sisters",
    filters: {
      ...defaultFilters,
      standing: ["publisher"],
      type: ["continuous_auxilary", "regular_pioneer", "publisher"],
      gender: ["female"],
    },
  },
  {
    id: "unbaptised_publishers",
    name: "Unbaptised Publishers",
    filters: { ...defaultFilters, standing: ["unbaptised_publisher"] },
  },
];
