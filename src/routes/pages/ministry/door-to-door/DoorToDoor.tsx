import { DoorToDoor as Content } from "@feature/maps/door-to-door/DoorToDoor";
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
            <IonBackButton defaultHref="/ministry" />
          </IonButtons>
          <IonTitle>Door to Door</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Content />
      </IonContent>
    </IonPage>
  );
};
