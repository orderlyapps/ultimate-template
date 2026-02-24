import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Button } from "@ionic-input/button/Button";

export const MapEditModal: React.FC = () => {
  const isMapEditModalOpen = useDoorToDoorStore(
    (state) => state.isMapEditModalOpen,
  );
  const editingMap = useDoorToDoorStore((state) => state.editingMap);
  const closeMapEditModal = useDoorToDoorStore(
    (state) => state.closeMapEditModal,
  );
  const setEditMode = useDoorToDoorStore((state) => state.setEditMode);
  const setEditingMap = useDoorToDoorStore((state) => state.setEditingMap);

  const handleClose = () => {
    closeMapEditModal();
  };

  const handleFinished = () => {
    closeMapEditModal();
    setEditMode(false);
    setEditingMap(null);
  };

  return (
    <IonModal isOpen={isMapEditModalOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Map: {editingMap?.name}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleClose} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Button onClick={handleFinished}>Finished</Button>
      </IonContent>
    </IonModal>
  );
};
