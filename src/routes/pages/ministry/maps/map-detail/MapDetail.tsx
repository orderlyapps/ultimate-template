import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { MapDetails } from "@feature/maps/map-details/MapDetails";

export const MapDetail: React.FC = () => {
  const { mapID } = useParams<{ mapID: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry/maps" text="Maps" />
          </IonButtons>
          <IonTitle>Map {mapID}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="fullscreen">
        <MapDetails />
      </IonContent>
    </IonPage>
  );
};
