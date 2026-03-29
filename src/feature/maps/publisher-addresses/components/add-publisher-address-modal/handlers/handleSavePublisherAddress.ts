import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";
import { geocodeAddress } from "@services/vendor/mapbox/helper/geocodeAddress";
import type { Version } from "@state/rxdb/collections/publisher";

export const handleSavePublisherAddress = async () => {
  const {
    label,
    suburb,
    street,
    houseNumber,
    unitNumber,
    closeAddAddressModal,
    setHouseNumber,
    setUnitNumber,
    setErrorMessage,
  } = useAddPublisherAddressStore.getState();

  const { selectedPublisherId, mapRef } =
    usePublisherAddressesStore.getState();

  if (!suburb || !street || houseNumber.trim() === "" || !selectedPublisherId) {
    setErrorMessage("Please fill in all required fields.");
    return;
  }

  setErrorMessage(null);

  const fallbackCoordinates: [number, number] =
    Array.isArray(street.coordinates) && street.coordinates.length === 2
      ? [street.coordinates[0], street.coordinates[1]]
      : [0, 0];

  try {
    const geocodeResult = await geocodeAddress(
      { address_number: houseNumber, street: street.name, place: suburb.name },
      { bbox: suburb.bbox },
    );
    const lng = geocodeResult?.properties.coordinates.longitude;
    const lat = geocodeResult?.properties.coordinates.latitude;
    const coordinates: [number, number] =
      lng != null && lat != null ? [lng, lat] : fallbackCoordinates;

    const now = Date.now();
    const version: Version = {
      created_by: "local",
      updated_by: "local",
      created_at: now,
      updated_at: now,
    };

    const newAddress = {
      id: crypto.randomUUID(),
      label: label.trim() || "Home",
      unit_number: unitNumber.trim() || undefined,
      house_number: houseNumber.trim(),
      street: street.name,
      suburb: suburb.name,
      coordinates,
      version,
    };

    const publisher = publisherLocalCollection.state.get(selectedPublisherId);
    if (!publisher) {
      setErrorMessage("Publisher not found.");
      return;
    }

    const existingAddresses = publisher.address || [];
    const updatedAddresses = [...existingAddresses, newAddress];

    publisherLocalCollection.update(selectedPublisherId, (draft) => {
      draft.address = updatedAddresses;
    });

    closeAddAddressModal();

    if (mapRef) {
      mapRef.flyTo({
        center: coordinates,
        zoom: 17,
        duration: 1200,
      });
    }

    const shouldKeepHouseNumber = unitNumber.trim() !== "";
    setUnitNumber("");
    setHouseNumber(shouldKeepHouseNumber ? houseNumber : "");
  } catch (error) {
    console.error(`Failed to add publisher address: ${error}`);
    setErrorMessage("Failed to add address. Please try again.");
  }
};
