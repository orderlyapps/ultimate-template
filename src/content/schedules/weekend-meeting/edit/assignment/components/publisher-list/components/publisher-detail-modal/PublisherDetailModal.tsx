import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { formatPublisherName } from "@format/formatPublisherName";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import { PublisherDetailContent } from "./components/publisher-detail-content/PublisherDetailContent";

type Props = {
  publisher: Publisher | null;
  isOpen: boolean;
  onDismiss: () => void;
};

export const PublisherDetailModal: React.FC<Props> = ({
  publisher,
  isOpen,
  onDismiss,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {publisher ? formatPublisherName(publisher) : "Publisher Details"}
          </IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {publisher && <PublisherDetailContent publisher={publisher} />}
      </IonContent>
    </IonModal>
  );
};
