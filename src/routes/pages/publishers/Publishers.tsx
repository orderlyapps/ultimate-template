import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { PublishersContent } from "@/content/publishers/PublishersContent";
import { FileImport } from "@input/file-import/FileImport";
import { ExportPublishersButton } from "@feature/db/publisher/export-publishers/ExportPublishersButton";
import { usePublisherListsStore } from "@/content/publishers/lists/store/usePublisherListsStore";

export const Publishers: React.FC = () => {
  const { setPendingImportFile } = usePublisherListsStore();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
          <IonButtons slot="end">
            <FileImport
              onFileSelect={(file) => setPendingImportFile(file)}
              accept=".json"
              iconOnly
            />
            <ExportPublishersButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Publishers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PublishersContent />
      </IonContent>
    </IonPage>
  );
};
