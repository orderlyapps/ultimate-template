import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MissingDetailsContent } from "@/content/home/tools/secretary/missing-details/MissingDetailsContent";

export const MissingDetails: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools/secretary" text="Secretary" />
          </IonButtons>
          <IonTitle>Missing Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Missing Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MissingDetailsContent />
      </IonContent>
    </IonPage>
  );
};
