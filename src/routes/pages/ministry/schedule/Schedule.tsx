import WeeklyScheduleContent from "@feature/field-service-schedule/WeeklyScheduleContent";
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

export const Schedule: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry" text="Ministry" />
          </IonButtons>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Weekly Field Service </IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <WeeklyScheduleContent />
      </IonContent>
    </IonPage>
  );
};
