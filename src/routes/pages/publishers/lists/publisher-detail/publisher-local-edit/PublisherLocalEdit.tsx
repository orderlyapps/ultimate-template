import { PublisherLocalEditContent } from "@/content/publishers/lists/publisher-detail/publisher-local-edit/PublisherLocalEditContent";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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
