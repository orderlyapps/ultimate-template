import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { useNotAtHomeAlertStore } from "../store/useNotAtHomeAlertStore";

export const handleToggleNotAtHomeWriteById = async (id: string) => {
  const setErrorMessage = useNotAtHomeAlertStore.getState().setErrorMessage;
  const { selectedUnits, setSelectedUnits } = useDoorToDoorStore.getState();
  const previousSelectedUnits = selectedUnits;

  if (selectedUnits) {
    setSelectedUnits(
      selectedUnits.map((unit) =>
        unit.id === id ? { ...unit, write: !unit.write } : unit,
      ),
    );
  }

  try {
    setErrorMessage(null);
    const tx = notAtHomeCollection.update(id, (draft) => {
      draft.write = !draft.write;
    });
    await tx.isPersisted.promise;
  } catch (error) {
    console.error(`Failed to update not at home: ${error}`);
    setSelectedUnits(previousSelectedUnits);
    setErrorMessage("Failed to update address. Please try again.");
    throw error;
  }
};
