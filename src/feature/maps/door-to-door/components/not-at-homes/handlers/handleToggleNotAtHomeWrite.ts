import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useNotAtHomeAlertStore } from "../store/useNotAtHomeAlertStore";

export const handleToggleNotAtHomeWrite = async () => {
  const { selectedNotAtHome, setSelectedNotAtHome } =
    useDoorToDoorStore.getState();
  const setErrorMessage = useNotAtHomeAlertStore.getState().setErrorMessage;

  if (!selectedNotAtHome) return;

  try {
    setErrorMessage(null);
    const tx = notAtHomeCollection.update(selectedNotAtHome.id, (draft) => {
      draft.write = !draft.write;
    });
    await tx.isPersisted.promise;
    setSelectedNotAtHome(null);
  } catch (error) {
    console.error(`Failed to update not at home: ${error}`);
    setErrorMessage("Failed to update address. Please try again.");
  }
};
