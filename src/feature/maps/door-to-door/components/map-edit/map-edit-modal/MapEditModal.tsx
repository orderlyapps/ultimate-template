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
import { MapEditForm } from "@feature/maps/door-to-door/components/map-edit/map-edit-modal/components/map-edit-form/MapEditForm";
import { MapAddForm } from "@feature/maps/door-to-door/components/map-edit/map-edit-modal/components/map-add-form/MapAddForm";

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
  const isAddingNewMap = useDoorToDoorStore((state) => state.isAddingNewMap);

  const handleClose = () => {
    closeMapEditModal();
  };

  const title = isAddingNewMap ? "Add New Map" : `Edit Map: ${editingMap?.name}`;

  return (
    <IonModal
      isOpen={isMapEditModalOpen}
      onDidDismiss={handleClose}
      key={editingMap?.id}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleClose} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {editingMap && isAddingNewMap && (
          <MapAddForm
            key={editingMap.id}
            newMap={editingMap}
          />
        )}
        {editingMap && !isAddingNewMap && (
          <MapEditForm
            key={editingMap.id}
            editingMap={editingMap}
            closeMapEditModal={closeMapEditModal}
            setEditMode={setEditMode}
            setEditingMap={setEditingMap}
          />
        )}
      </IonContent>
    </IonModal>
  );
};
