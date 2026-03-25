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
import { useParams, useHistory } from "react-router-dom";
import { WeekNavigation } from "@ui/components/custom/navigation/week-navigation/WeekNavigation";
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { EditButton } from "@input/button/edit-button/EditButton";

export const WeekendMeeting: React.FC = () => {
  const history = useHistory();
  const { week_id } = useParams<{ week_id: string }>();

  const { isUnlocked: show } = useFeatureAccess(["damian"]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/schedules" text="Schedules" />
          </IonButtons>
          <IonButtons slot="end">
            {show && (
              <EditButton
                onClick={() =>
                  history.push(`/schedules/weekend-meeting/${week_id}/edit`)
                }
              />
            )}
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
