import { MapListModal } from "@feature/maps/door-to-door/components/map-list-modal/MapListModal";
import { DoorToDoor as Content } from "@feature/maps/door-to-door/DoorToDoor";
import { MapSettingsModal } from "@feature/maps/map-settings-modal/MapSettingsModal";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

export const DoorToDoor: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry" text="Ministry" />
          </IonButtons>
          <IonTitle>Door to Door</IonTitle>
          <IonButtons slot="end">
            <MapListModal />
            <MapSettingsModal id="door-to-door" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="fullscreen">
        <Content />
      </IonContent>
    </IonPage>
  );
};
