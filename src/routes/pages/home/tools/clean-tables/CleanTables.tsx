import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CleanTablesContent } from "@/content/home/tools/clean-tables/CleanTablesContent";

/**
 * Page wrapper for Clean Tables management.
 * Renders the IonPage shell and delegates content to CleanTablesContent.
 */
export const CleanTables: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Cleaning Assignments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cleaning Assignments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CleanTablesContent />
      </IonContent>
    </IonPage>
  );
};
