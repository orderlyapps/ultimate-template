import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AppointedList } from "@feature/db/publisher/lists/appointed-list/AppointedList";
import { Space } from "@layout/space/Space";

export const Appointed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonTitle>Appointed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Appointed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <AppointedList />
      </IonContent>
    </IonPage>
  );
};
