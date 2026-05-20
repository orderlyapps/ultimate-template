import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RemindersContent } from "@/content/home/tools/reminders/RemindersContent";

export const Reminders: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools" text="Tools" />
          </IonButtons>
          <IonTitle>Reminders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reminders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RemindersContent />
      </IonContent>
    </IonPage>
  );
};
