import { create } from "zustand";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";
import type { Street } from "@tanstack-db/street/streetSchema";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { Address } from "@state/rxdb/collections/publisher";

type AddressItem = NonNullable<Address>[number];

interface PublisherAddressStore {
  selectedPublisher: Publisher | null;
  setSelectedPublisher: (publisher: Publisher | null) => void;

  existingAddress: AddressItem | null;
  setExistingAddress: (address: AddressItem | null) => void;

  suburb: Suburb | null;
  setSuburb: (suburb: Suburb | null) => void;

  street: Street | null;
  setStreet: (street: Street | null) => void;

  houseNumber: string;
  setHouseNumber: (houseNumber: string) => void;

  unitNumber: string;
  setUnitNumber: (unitNumber: string) => void;

  resetForm: () => void;
}

export const usePublisherAddressStore = create<PublisherAddressStore>((set) => ({
  selectedPublisher: null,
  setSelectedPublisher: (publisher) => set({ selectedPublisher: publisher }),

  existingAddress: null,
  setExistingAddress: (address) => set({ existingAddress: address }),

  suburb: null,
  setSuburb: (suburb) =>
    set({
      suburb,
      street: null,
      houseNumber: "",
      unitNumber: "",
    }),

  street: null,
  setStreet: (street) =>
    set({
      street,
      houseNumber: "",
      unitNumber: "",
    }),

  houseNumber: "",
  setHouseNumber: (houseNumber) =>
    set({
      houseNumber,
      unitNumber: "",
    }),

  unitNumber: "",
  setUnitNumber: (unitNumber) => set({ unitNumber }),

  resetForm: () =>
    set({
      selectedPublisher: null,
      existingAddress: null,
      suburb: null,
      street: null,
      houseNumber: "",
      unitNumber: "",
    }),
}));
