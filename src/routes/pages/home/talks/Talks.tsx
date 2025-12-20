import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { AddButton } from "@input/button/add-button/AddButton";
import { useState } from "react";
import { AddTalkAlert } from "../../../../feature/talks/components/add-alerts/add-talk-alert/AddTalkAlert";
import { TalksList } from "../../../../feature/talks/components/page-contents/talks/talks-list/TalksList";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { FileImport } from "@input/file-import/FileImport";

export const Talks: React.FC = () => {
  const [isAddTalkOpen, setIsAddTalkOpen] = useState(false);
  const [addTalkAlertKey, setAddTalkAlertKey] = useState(0);
  const importTalk = useTalksStore((s) => s.importTalk);

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const talk = JSON.parse(text);
      if (talk.name && Array.isArray(talk.sections)) {
        importTalk(talk);
      }
    } catch (e) {
      console.error("Failed to import talk", e);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonButtons slot="end">
            <FileImport
              onFileSelect={handleImport}
              accept=".talk.ord"
              iconOnly
            />
            <AddButton
              onClick={() => {
                setAddTalkAlertKey((k) => k + 1);
                setIsAddTalkOpen(true);
              }}
            />
          </IonButtons>
          <IonTitle>Talks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Talks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <TalksList />
        <AddTalkAlert
          key={addTalkAlertKey}
          isOpen={isAddTalkOpen}
          onDismiss={() => setIsAddTalkOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};
