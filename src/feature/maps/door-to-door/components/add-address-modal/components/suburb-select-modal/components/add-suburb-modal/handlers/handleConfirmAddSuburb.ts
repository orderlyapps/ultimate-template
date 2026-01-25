import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { useAddSuburbModalStore } from "../store/useAddSuburbModalStore";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";

export const handleConfirmAddSuburb = async (onClose: () => void) => {
  const { selectedSuburb, setSelectedSuburb, setErrorMessage } =
    useAddSuburbModalStore.getState();
  const { setSuburb, addRecentSuburb } = useAddAddressStore.getState();

  if (!selectedSuburb) return;

  try {
    const congregationId = getUserCongregation()?.id;
    if (!congregationId) {
      throw new Error("No congregation selected");
    }

    if (!selectedSuburb.properties.bbox) {
      throw new Error("Suburb does not have a bounding box");
    }

    const newSuburb = {
      id: crypto.randomUUID(),
      congregation_id: congregationId,
      name: selectedSuburb.properties.name,
      bbox: selectedSuburb.properties.bbox,
    };

    const tx = suburbCollection.insert(newSuburb);

    await tx.isPersisted.promise;

    setSuburb(newSuburb);
    addRecentSuburb({
      value: newSuburb.id,
      label: newSuburb.name,
    });

    setSelectedSuburb(null);
    onClose();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("suburb_congregation_id_name_key")) {
      console.log("This suburb is has already been added");
      setErrorMessage(`This suburb is has already been added`);
    } else {
      setErrorMessage(errorMessage);
      console.error(`Failed to add todo: ${error}`);
    }

    setSelectedSuburb(null);
  }
};
