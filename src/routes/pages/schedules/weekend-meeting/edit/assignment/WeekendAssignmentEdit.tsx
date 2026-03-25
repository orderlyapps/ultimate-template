import { WeekendAssignmentEditContent } from "@/content/schedules/weekend-meeting/edit/assignment/WeekendAssignmentEditContent";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";

export const WeekendAssignmentEdit: React.FC = () => {
  const { week_id } = useParams<{
    week_id: string;
  }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/schedules/weekend-meeting/${week_id}/edit`}
              text="Back"
            />
          </IonButtons>
          <IonTitle>Edit Assignment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekendAssignmentEditContent />
      </IonContent>
    </IonPage>
  );
};
