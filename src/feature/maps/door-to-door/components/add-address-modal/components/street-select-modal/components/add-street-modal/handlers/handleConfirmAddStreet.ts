import { streetCollection } from "@tanstack-db/street/streetCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { useAddStreetModalStore } from "../store/useAddStreetModalStore";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";

export const handleConfirmAddStreet = async (
  suburb: Suburb | null,
  onClose: () => void
) => {
  const { selectedStreet, setSelectedStreet, setErrorMessage } =
    useAddStreetModalStore.getState();
  const { setStreet, addRecentStreet } = useAddAddressStore.getState();

  if (!selectedStreet || !suburb) return;

  try {
    const congregationId = getUserCongregation()?.id;
    if (!congregationId) {
      throw new Error("No congregation selected");
    }

    const newStreet = {
      id: crypto.randomUUID(),
      congregation_id: congregationId,
      suburb_id: suburb.id,
      name: selectedStreet.name,
      coordinates: selectedStreet.coordinates,
    };

    const tx = streetCollection.insert(newStreet);

    await tx.isPersisted.promise;

    setStreet(newStreet);
    addRecentStreet(suburb, {
      value: newStreet.id,
      label: newStreet.name,
    });

    setSelectedStreet(null);
    onClose();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("street_congregation_id_name_suburb_id_key")) {
      console.log("This street has already been added");
      setErrorMessage(`This street has already been added`);
    } else {
      setErrorMessage(errorMessage);
      console.error(`Failed to add street: ${error}`);
    }

    setSelectedStreet(null);
  }
};
