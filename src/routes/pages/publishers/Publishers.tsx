import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { PublishersContent } from "@/content/publishers/PublishersContent";

export const Publishers: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Publishers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PublishersContent />
      </IonContent>
    </IonPage>
  );
};
