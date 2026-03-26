import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SchedulePdfsContent } from "@/content/home/tools/schedule-pdfs/SchedulePdfsContent";

export const SchedulePdfs: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tools" text="Tools" />
          </IonButtons>
          <IonTitle>Schedule PDFs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule PDFs</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SchedulePdfsContent />
      </IonContent>
    </IonPage>
  );
};
