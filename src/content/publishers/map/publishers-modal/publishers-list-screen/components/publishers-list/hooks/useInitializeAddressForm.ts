import { useEffect } from "react";
import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";

interface UseInitializeAddressFormProps {
  publisher: Publisher | null;
  publisherLocal: PublisherLocal | null;
  shouldInitialize: boolean;
  onInitialized: () => void;
}

/**
 * Hook to initialize the address form with existing address data.
 * Fetches suburb and street by ID from the database.
 */
export const useInitializeAddressForm = ({
  publisher,
  publisherLocal,
  shouldInitialize,
  onInitialized,
}: UseInitializeAddressFormProps) => {
  const setSelectedPublisher = usePublisherAddressStore(
    (state) => state.setSelectedPublisher
  );
  const setExistingAddress = usePublisherAddressStore(
    (state) => state.setExistingAddress
  );
  const setSuburb = usePublisherAddressStore((state) => state.setSuburb);
  const setStreet = usePublisherAddressStore((state) => state.setStreet);
  const setHouseNumber = usePublisherAddressStore(
    (state) => state.setHouseNumber
  );
  const setUnitNumber = usePublisherAddressStore((state) => state.setUnitNumber);

  const existingAddr = publisherLocal?.address?.[0] ?? null;
  const suburbId = existingAddr?.suburb;
  const streetId = existingAddr?.street;

  // Fetch suburb by ID if it exists
  const { data: suburbData } = useLiveQuery(
    (q) => {
      if (!suburbId) return null;
      return q
        .from({ s: suburbCollection })
        .where(({ s }) => eq(s.id, suburbId));
    },
    [suburbId]
  );

  // Fetch street by ID if it exists
  const { data: streetData } = useLiveQuery(
    (q) => {
      if (!streetId) return null;
      return q
        .from({ s: streetCollection })
        .where(({ s }) => eq(s.id, streetId));
    },
    [streetId]
  );

  // Initialize the form when data is available and initialization is requested
  useEffect(() => {
    if (!shouldInitialize || !publisher) return;

    setSelectedPublisher(publisher);
    setExistingAddress(existingAddr);

    if (existingAddr) {
      // Set suburb if found, otherwise null
      const foundSuburb = suburbData?.[0] ?? null;
      setSuburb(foundSuburb);

      // Set street if found, otherwise null
      const foundStreet = streetData?.[0] ?? null;
      setStreet(foundStreet);

      setHouseNumber(existingAddr.house_number ?? "");
      setUnitNumber(existingAddr.unit_number ?? "");
    }

    // Mark as initialized
    onInitialized();
  }, [
    shouldInitialize,
    publisher,
    existingAddr,
    suburbData,
    streetData,
    setSelectedPublisher,
    setExistingAddress,
    setSuburb,
    setStreet,
    setHouseNumber,
    setUnitNumber,
    onInitialized,
  ]);
};
