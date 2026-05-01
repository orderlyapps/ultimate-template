import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MonthlyReportsContent } from "@/content/publishers/lists/publisher-detail/components/confidential-data/components/monthly-reports/MonthlyReportsContent";

/**
 * Page wrapper for viewing a publisher's monthly reports for the last 24 months.
 */
export const PublisherReports: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers/all" text="Back" />
          </IonButtons>
          <IonTitle>Publisher Record</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"> Publisher Record</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MonthlyReportsContent />
      </IonContent>
    </IonPage>
  );
};
