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
import { AddTalkAlert } from "../../../../feature/components/add-talk-alert/AddTalkAlert";
import { TalksOutlineList } from "../../../../feature/components/talks-outline-list/TalksOutlineList";

export const Talks: React.FC = () => {
  const [isAddTalkOpen, setIsAddTalkOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonButtons slot="end">
            <AddButton onClick={() => setIsAddTalkOpen(true)} />
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
        <TalksOutlineList />
        <AddTalkAlert
          isOpen={isAddTalkOpen}
          onDismiss={() => setIsAddTalkOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};
