import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonPage,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PublishersList } from "@/content/publishers/map/publishers-modal/publishers-list-screen/components/publishers-list/PublishersList";

type PublishersListScreenProps = {
  onClose: () => void;
};

export const PublishersListScreen_XXX: React.FC<PublishersListScreenProps> = ({
  onClose,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onClose} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublishersList />
      </IonContent>
    </IonPage>
  );
};
