import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { PublisherAddressesContent } from "@/content/publishers/addresses/PublisherAddressesContent";
import { MapSettingsModal } from "@feature/maps/map-settings-modal/MapSettingsModal";

export const PublisherAddresses: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonTitle>Publisher Addresses</IonTitle>
          <IonButtons slot="end">
            <MapSettingsModal id="publisher-addresses" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="fullscreen">
        <PublisherAddressesContent />
      </IonContent>
    </IonPage>
  );
};
