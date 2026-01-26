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

export const WeekendMeeting: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/schedules" text="Schedules" />
          </IonButtons>
          <IonTitle>Weekend Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Weekend Meeting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
      </IonContent>
    </IonPage>
  );
};
