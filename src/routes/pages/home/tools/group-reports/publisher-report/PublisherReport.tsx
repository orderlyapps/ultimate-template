import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherReportContent } from "@/content/home/tools/group-reports/publisher-report/PublisherReportContent";

/**
 * Page wrapper for the individual publisher report form.
 */
export const PublisherReport: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/group-reports" text="Back" />
          </IonButtons>
          <IonTitle>Report</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Report</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PublisherReportContent />
      </IonContent>
    </IonPage>
  );
};
