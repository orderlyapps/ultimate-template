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

export const Talks: React.FC = () => {
  const [isAddTalkOpen, setIsAddTalkOpen] = useState(false);
  const [addTalkAlertKey, setAddTalkAlertKey] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonButtons slot="end">
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
          <IonToolbar >
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
