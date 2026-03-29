import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
} from "@ionic/react";
import { useState } from "react";
import listIcon from "@icons/brother-sister.svg";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { usePublishersWithAddresses } from "@feature/maps/publisher-addresses/components/publisher-list-modal/hooks/usePublishersWithAddresses";
import { PublisherListItem } from "@feature/maps/publisher-addresses/components/publisher-list-modal/components/publisher-list-item/PublisherListItem";

export const PublisherListModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const publishersWithAddresses = usePublishersWithAddresses();

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="start">
        <IonFabButton onClick={() => setIsOpen(true)}>
          <IonIcon icon={listIcon} size="large" />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Publishers with Addresses</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={() => setIsOpen(false)} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {publishersWithAddresses.map((publisher) => (
              <PublisherListItem
                key={publisher.publisher_id}
                publisher={publisher}
                onSelect={() => setIsOpen(false)}
              />
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};
