import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

interface PublisherAddress {
  id: string;
  publisher_id: string;
  label: string;
  unit_number?: string;
  house_number?: string;
  street?: string;
  suburb?: string;
  coordinates: [number, number];
}

export const usePublisherAddresses = (): PublisherAddress[] => {
  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).select(({ p }) => ({
      publisher_id: p.publisher_id,
      address: p.address,
    })),
  );

  const addresses: PublisherAddress[] = [];

  for (const row of publishers) {
    const publisherAddresses = row.address;
    if (!publisherAddresses) continue;

    for (const addr of publisherAddresses) {
      if (addr.coordinates && addr.coordinates.length >= 2) {
        addresses.push({
          id: addr.id,
          publisher_id: row.publisher_id,
          label: addr.label,
          unit_number: addr.unit_number,
          house_number: addr.house_number,
          street: addr.street,
          suburb: addr.suburb,
          coordinates: [addr.coordinates[0], addr.coordinates[1]],
        });
      }
    }
  }

  return addresses;
};
