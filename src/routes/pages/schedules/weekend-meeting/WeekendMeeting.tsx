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
import { useParams } from "react-router-dom";
import { WeekNavigation } from "@ui/components/custom/navigation/week-navigation/WeekNavigation";
import { format, startOfWeek } from "date-fns";

export const WeekendMeeting: React.FC = () => {
  const {
    week_id = format(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      "yyyy-MM-dd",
    ),
  } = useParams<{ week_id: string }>();

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
        <WeekNavigation week_id={week_id} />
        <UpcomingWeekendMeetings weekId={week_id} />
      </IonContent>
    </IonPage>
  );
};
