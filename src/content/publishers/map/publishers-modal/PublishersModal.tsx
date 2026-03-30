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
  IonButton,
} from "@ionic/react";
import peopleIcon from "@icons/brother-sister.svg";
import { PublishersList } from "./publishers-list/PublishersList";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";

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
              <IonButton onClick={closeModal}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <PublishersList />
        </IonContent>
      </IonModal>
    </>
  );
};
