import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { AssignmentList } from "@/content/home/assignments/AssignmentList";

/**
 * Page component that displays all upcoming assignments for the current publisher.
 * Accessed via the "show more" button from the home accordion assignments section.
 */
export const HomeAssignments: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Assignments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Assignments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AssignmentList />
      </IonContent>
    </IonPage>
  );
};
