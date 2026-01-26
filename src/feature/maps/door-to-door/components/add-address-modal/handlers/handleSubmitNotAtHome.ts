import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import {
  buildAddressString,
  geocodeAddress,
} from "@services/vendor/mapbox/helper/geocodeAddress";
import type { NotAtHome } from "@tanstack-db/not_at_home/notAtHomeSchema";

export const handleSubmitNotAtHome = async () => {
  const {
    suburb,
    street,
    houseNumber,
    unitNumber,
    listType,
    closeAddAddressModal,
    setHouseNumber,
    setUnitNumber,
    setListType,
    setErrorMessage,
  } = useAddAddressStore.getState();

  if (!suburb || !street || houseNumber.trim() === "") return;

  setErrorMessage(null);

  const congregationId = getUserCongregation()?.id;
  if (!congregationId) {
    console.error("No congregation selected");
    setErrorMessage("No congregation selected.");
    return;
  }

  const fallbackCoordinates: [number, number] =
    Array.isArray(street.coordinates) && street.coordinates.length === 2
      ? [street.coordinates[0], street.coordinates[1]]
      : [0, 0];

  const addressString = buildAddressString(
    houseNumber,
    unitNumber,
    street.name,
    suburb.name,
  );

  try {
    const geocodeResult = await geocodeAddress(addressString, { suburb });
    const lng = geocodeResult?.properties.coordinates.longitude;
    const lat = geocodeResult?.properties.coordinates.latitude;
    const coordinates: [number, number] =
      lng != null && lat != null ? [lng, lat] : fallbackCoordinates;

    const match_data = geocodeResult?.properties?.match_code || {};

    const newNotAtHome: NotAtHome = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      coordinates,
      congregation_id: congregationId,
      suburb_id: suburb.id,
      street_id: street.id,
      house_number: houseNumber.trim(),
      unit_number: unitNumber.trim() || undefined,
      visit_log: [new Date().toISOString()],
      write: listType === "write",
      match_data,
    };

    const tx = notAtHomeCollection.insert(newNotAtHome);

    const { mapRef } = useDoorToDoorStore.getState();

    closeAddAddressModal();

    if (mapRef) {
      mapRef.flyTo({
        center: newNotAtHome.coordinates,
        zoom: 17,
        duration: 1200,
      });
    }

    await tx.isPersisted.promise;

    const shouldKeepHouseNumber = unitNumber.trim() !== "";
    setUnitNumber("");
    setListType("return");
    setHouseNumber(shouldKeepHouseNumber ? houseNumber : "");
  } catch (error) {
    console.error(`Failed to add not at home: ${error}`);
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof error.message === "string" &&
      error.message.includes("unique_not_at_home_combination")
    ) {
      setErrorMessage("Address already exists. Please try again.");
    } else {
      setErrorMessage("Failed to add address. Please try again.");
    }
  }
};
