import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PublisherForm } from "../../../../../../content/publishers/lists/components/publisher-lists-modals/components/add-publisher-modal/publisher-form/PublisherForm";

type Props = {
  publisherId: string;
  isOpen: boolean;
  onDismiss: () => void;
};

export function EditPublisherModal({ publisherId, isOpen, onDismiss }: Props) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Publisher</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PublisherForm publisherId={publisherId} onSuccess={onDismiss} />
      </IonContent>
    </IonModal>
  );
}
