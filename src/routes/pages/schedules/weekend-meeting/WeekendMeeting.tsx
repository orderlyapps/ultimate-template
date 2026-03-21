import { UpcomingWeekendMeetings } from "@feature/db/weekend-meeting/upcoming-weekend-meetings/UpcomingWeekendMeetings";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { WeekNavigation } from "@ui/components/custom/navigation/week-navigation/WeekNavigation";
import editIcon from "@icons/edit.svg";
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";

export const WeekendMeeting: React.FC = () => {
  const history = useHistory();
  const { week_id } = useParams<{ week_id: string }>();

  const { isUnlocked: show } = useFeatureAccess([
    "9da270dd-ef23-417b-89a8-2a61bcbe24e0",
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/schedules" text="Schedules" />
          </IonButtons>
          <IonButtons slot="end">
            {show && (
              <IonButton
                onClick={() =>
                  history.push(`/schedules/weekend-meeting/${week_id}/edit`)
                }
              >
                <IonIcon src={editIcon} slot="icon-only" />
              </IonButton>
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
