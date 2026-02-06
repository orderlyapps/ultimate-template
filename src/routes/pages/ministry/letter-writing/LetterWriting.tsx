import {
  IonBackButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { LetterWritingList } from "@feature/db/not-at-home/letter-writing-list/LetterWritingList";

export const LetterWriting: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry" text="Ministry" />
          </IonButtons>
          <IonTitle>Letter Writing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Letter Writing</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <LetterWritingList />
      </IonContent>
    </IonPage>
  );
};
