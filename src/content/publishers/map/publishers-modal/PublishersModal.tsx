import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import peopleIcon from "@icons/brother-sister.svg";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PublishersList } from "./publishers-list-screen/components/publishers-list/PublishersList";
import { EditAddressModal } from "./edit-address-modal/EditAddressModal";

export const PublishersModal: React.FC = () => {
  const { isOpen, openModal, closeModal } = usePublishersMapStore();

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={openModal}>
          <IonIcon src={peopleIcon} />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Publishers</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={closeModal} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <PublishersList />
        </IonContent>
      </IonModal>
      <EditAddressModal />
    </>
  );
};
