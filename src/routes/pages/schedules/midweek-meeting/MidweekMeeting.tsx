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
import { useParams } from "react-router-dom";
import { WeekNavigation } from "@ui/components/custom/navigation/week-navigation/WeekNavigation";

export const MidweekMeeting: React.FC = () => {
  const { week_id } = useParams<{ week_id: string }>();

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
      <IonContent fullscreen id="fullscreen">
        <WeekNavigation week_id={week_id} />
        <UpcomingMeetings weekId={week_id} />
      </IonContent>
    </IonPage>
  );
};
