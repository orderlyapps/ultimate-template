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

export const WeekendAssignmentEdit: React.FC = () => {
  const { week_id } = useParams<{
    week_id: string;
    assignment_id: string;
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
        {/* Content will be implemented later */}
      </IonContent>
    </IonPage>
  );
};
