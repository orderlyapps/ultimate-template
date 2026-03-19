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
