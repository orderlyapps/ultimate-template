import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { GroupReportsContent } from "@/content/home/tools/group-reports/GroupReportsContent";

/**
 * Page wrapper for Group Reports.
 * Renders the IonPage shell and delegates content to GroupReportsContent.
 */
export const GroupReports: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Group Reports</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Group Reports</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GroupReportsContent />
      </IonContent>
    </IonPage>
  );
};
