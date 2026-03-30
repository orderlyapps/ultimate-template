import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherLocalEditContent } from "@/content/publishers/all/publisher-detail/publisher-local-edit/PublisherLocalEditContent";

export const PublisherEdit: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>Edit Publisher</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <PublisherLocalEditContent />
      </IonContent>
    </IonPage>
  );
};
