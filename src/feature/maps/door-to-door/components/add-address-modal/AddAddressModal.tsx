import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import addIcon from "@icons/add.svg";

export const AddAddressModal: React.FC = () => {
  const isOpen = useDoorToDoorStore((state) => state.isAddAddressModalOpen);
  const closeAddAddressModal = useDoorToDoorStore(
    (state) => state.closeAddAddressModal,
  );

  const openAddAddressModal = useDoorToDoorStore(
    (state) => state.openAddAddressModal,
  );

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={openAddAddressModal}>
          <IonIcon icon={addIcon} size="large" />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen} onDidDismiss={closeAddAddressModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Address</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeAddAddressModal}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Placeholder text for Add Address modal</p>
        </IonContent>
      </IonModal>
    </>
  );
};
