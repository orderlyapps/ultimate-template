import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import editIcon from "@icons/edit.svg";

export const MapEditFab: React.FC = () => {
  const isEditMode = useDoorToDoorStore((state) => state.isEditMode);
  const openMapEditModal = useDoorToDoorStore(
    (state) => state.openMapEditModal,
  );
  const setIsDrawMode = useDoorToDoorStore((state) => state.setIsDrawMode);
  const setIsEditingBoundary = useDoorToDoorStore((state) => state.setIsEditingBoundary);
  const setEditingBlockId = useDoorToDoorStore((state) => state.setEditingBlockId);

  if (!isEditMode) return null;

  const handleClick = () => {
    setIsDrawMode(false);
    setIsEditingBoundary(false);
    setEditingBlockId(null);
    openMapEditModal();
  };

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton onClick={handleClick}>
        <IonIcon icon={editIcon} size="large" />
      </IonFabButton>
    </IonFab>
  );
};
