import { UpcomingMeetings } from "@feature/db/midweek-meeting/upcoming-meetings/UpcomingMeetings";
import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

export const MidweekMeeting: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/schedules" text="Schedules" />
          </IonButtons>
          <IonTitle>Midweek Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Midweek Meeting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UpcomingMeetings />
      </IonContent>
    </IonPage>
  );
};
