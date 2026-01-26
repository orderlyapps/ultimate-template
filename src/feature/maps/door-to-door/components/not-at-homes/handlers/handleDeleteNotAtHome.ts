import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useNotAtHomeAlertStore } from "../store/useNotAtHomeAlertStore";

export const handleDeleteNotAtHome = async () => {
  const { selectedNotAtHome, setSelectedNotAtHome } =
    useDoorToDoorStore.getState();
  const setErrorMessage = useNotAtHomeAlertStore.getState().setErrorMessage;

  if (!selectedNotAtHome) return;

  try {
    setErrorMessage(null);
    const tx = notAtHomeCollection.delete(selectedNotAtHome.id);
    await tx.isPersisted.promise;
    setSelectedNotAtHome(null);
  } catch (error) {
    console.error(`Failed to delete not at home: ${error}`);
    setErrorMessage("Failed to delete address. Please try again.");
  }
};
