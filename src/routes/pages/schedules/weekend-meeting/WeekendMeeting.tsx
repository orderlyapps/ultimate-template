import { UpcomingWeekendMeetings } from "@feature/db/weekend-meeting/upcoming-weekend-meetings/UpcomingWeekendMeetings";
import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Weekend Meeting</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UpcomingWeekendMeetings />
      </IonContent>
    </IonPage>
  );
};
