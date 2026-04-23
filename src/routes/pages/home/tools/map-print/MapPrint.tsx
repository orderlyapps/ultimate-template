import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
} from "@ionic/react";
import { MapPrintContent } from "@feature/maps/map-print/MapPrintContent";
import { useMapPrintStore } from "@feature/maps/map-print/store/use-map-print-store";

export const MapPrint: React.FC = () => {
  const { setIsModalOpen } = useMapPrintStore();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Map Print</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen(true)}>
              Select Map
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="fullscreen">
        <MapPrintContent />
      </IonContent>
    </IonPage>
  );
};
