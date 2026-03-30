import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PublisherForm } from "./publisher-form/PublisherForm";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export function AddPublisherModal({ isOpen, onDismiss }: Props) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Publisher</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PublisherForm onSuccess={onDismiss} />
      </IonContent>
    </IonModal>
  );
}
