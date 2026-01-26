import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useNotAtHomeAlertStore } from "../store/useNotAtHomeAlertStore";

export const handleDeleteNotAtHomeById = async (id: string) => {
  const setErrorMessage = useNotAtHomeAlertStore.getState().setErrorMessage;
  const { selectedUnits, setSelectedUnits } = useDoorToDoorStore.getState();
  const previousSelectedUnits = selectedUnits;

  if (selectedUnits) {
    const nextUnits = selectedUnits.filter((unit) => unit.id !== id);
    setSelectedUnits(nextUnits.length > 0 ? nextUnits : null);
  }

  try {
    setErrorMessage(null);
    const tx = notAtHomeCollection.delete(id);
    await tx.isPersisted.promise;
  } catch (error) {
    console.error(`Failed to delete not at home: ${error}`);
    setSelectedUnits(previousSelectedUnits);
    setErrorMessage("Failed to delete address. Please try again.");
    throw error;
  }
};
