import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import { geocodeAddress } from "@services/vendor/mapbox/helper/geocodeAddress";
import { useLiveQuery } from "@tanstack/react-db";
import { eq } from "@tanstack/react-db";

export const useSavePublisherAddress = () => {
  const selectedPublisher = usePublisherAddressStore(
    (state) => state.selectedPublisher
  );
  const existingAddress = usePublisherAddressStore(
    (state) => state.existingAddress
  );
  const suburb = usePublisherAddressStore((state) => state.suburb);
  const street = usePublisherAddressStore((state) => state.street);
  const houseNumber = usePublisherAddressStore((state) => state.houseNumber);
  const unitNumber = usePublisherAddressStore((state) => state.unitNumber);
  const resetForm = usePublisherAddressStore((state) => state.resetForm);

  const selectedPublisherId = selectedPublisher?.id;

  const { data: publisherLocalData } = useLiveQuery(
    (q) => {
      if (!selectedPublisherId) return null;
      return q
        .from({ pl: publisherLocalCollection })
        .where(({ pl }) => eq(pl.publisher_id, selectedPublisherId));
    },
    [selectedPublisherId]
  );

  const publisherLocal = publisherLocalData?.[0];

  const saveAddress = async () => {
    if (!selectedPublisher || !suburb || !street || !houseNumber) {
      throw new Error("Missing required address fields");
    }

    let coordinates: number[] | undefined;

    try {
      const geocodeResult = await geocodeAddress(
        {
          address_number: houseNumber,
          street: street.name,
          place: suburb.name,
        },
        {
          bbox: suburb.bbox,
        }
      );

      if (geocodeResult?.geometry?.coordinates) {
        coordinates = geocodeResult.geometry.coordinates;
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }

    const now = Date.now();
    const userId = "local-user";

    const newAddress = {
      id: existingAddress?.id ?? crypto.randomUUID(),
      label: "Home",
      unit_number: unitNumber || undefined,
      house_number: houseNumber,
      street: street.name,
      suburb: suburb.name,
      coordinates,
      version: {
        created_by: existingAddress?.version?.created_by ?? userId,
        updated_by: userId,
        created_at: existingAddress?.version?.created_at ?? now,
        updated_at: now,
      },
    };

    const existingAddresses = publisherLocal?.address ?? [];
    const updatedAddresses = existingAddress
      ? existingAddresses.map((addr) =>
          addr.id === existingAddress.id ? newAddress : addr
        )
      : [...existingAddresses, newAddress];

    if (publisherLocal) {
      publisherLocalCollection.update(publisherLocal.publisher_id, (draft) => {
        draft.address = updatedAddresses;
        draft.version.updated_at = now;
      });
    } else {
      publisherLocalCollection.insert({
        publisher_id: selectedPublisher.id,
        confidential_id: crypto.randomUUID(),
        address: [newAddress],
        version: {
          created_by: userId,
          updated_by: userId,
          created_at: now,
          updated_at: now,
        },
      });
    }

    resetForm();
  };

  return { saveAddress };
};
