import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { PublishersContent } from "@/content/publishers/PublishersContent";
import { FileExport } from "@input/file-export/FileExport";
import { FileImport } from "@input/file-import/FileImport";
import {
  exportPublisherLocalData,
  generateExportFilename,
} from "@state/tanstack/db/publisher-local/publisherLocalExportImport";
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
            <FileExport
              getData={exportPublisherLocalData}
              filename={generateExportFilename()}
              iconOnly
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
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
