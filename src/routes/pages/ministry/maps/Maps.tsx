import { MapList } from "@feature/maps/images/MapsContent";
import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";

export const Maps: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry" text="Ministry" />
          </IonButtons>
          <IonTitle>Maps</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Maps</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <MapList />
      </IonContent>
    </IonPage>
  );
};
