import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { formatPublisherName } from "@format/formatPublisherName";

export interface PublisherWithAddresses {
  publisher_id: string;
  name: string;
  addresses: Array<{
    id: string;
    label: string;
    unit_number?: string;
    house_number?: string;
    street?: string;
    suburb?: string;
    coordinates: [number, number];
  }>;
}

export const usePublishersWithAddresses = (): PublisherWithAddresses[] => {
  const { data: publishersLocal = [] } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).select(({ p }) => ({
      publisher_id: p.publisher_id,
      address: p.address,
    })),
  );

  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      display_name: p.display_name,
    })),
  );

  const result: PublisherWithAddresses[] = [];

  for (const pl of publishersLocal) {
    if (!pl.address) continue;

    const addresses = pl.address.filter(
      (addr: { coordinates?: number[] }) =>
        addr.coordinates && addr.coordinates.length >= 2,
    );

    if (addresses.length === 0) continue;

    const publisher = publishers.find((p) => p.id === pl.publisher_id);
    const name = formatPublisherName(publisher);

    result.push({
      publisher_id: pl.publisher_id,
      name,
      addresses: addresses.map(
        (addr: {
          id: string;
          label: string;
          unit_number?: string;
          house_number?: string;
          street?: string;
          suburb?: string;
          coordinates?: number[];
        }) => ({
          id: addr.id,
          label: addr.label,
          unit_number: addr.unit_number,
          house_number: addr.house_number,
          street: addr.street,
          suburb: addr.suburb,
          coordinates: [addr.coordinates![0], addr.coordinates![1]] as [
            number,
            number,
          ],
        }),
      ),
    });
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
};
