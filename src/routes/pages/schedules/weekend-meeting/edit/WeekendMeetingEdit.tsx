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
import { WeekendMeetingEditForm } from "@feature/weekend-meeting/edit/WeekendMeetingEditForm";

export const WeekendMeetingEdit: React.FC = () => {
  const { week_id } = useParams<{ week_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/schedules/weekend-meeting/${week_id}`}
              text="Back"
            />
          </IonButtons>
          <IonTitle>Edit Weekend Meeting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekNavigation week_id={week_id} weeksToDisplay={26} />
        <WeekendMeetingEditForm weekId={week_id} />
      </IonContent>
    </IonPage>
  );
};
