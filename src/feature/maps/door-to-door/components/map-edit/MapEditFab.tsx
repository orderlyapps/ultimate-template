import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import editIcon from "@icons/edit.svg";

export const MapEditFab: React.FC = () => {
  const isEditMode = useDoorToDoorStore((state) => state.isEditMode);
  const openMapEditModal = useDoorToDoorStore(
    (state) => state.openMapEditModal,
  );

  if (!isEditMode) return null;

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton onClick={openMapEditModal}>
        <IonIcon icon={editIcon} size="large" />
      </IonFabButton>
    </IonFab>
  );
};
