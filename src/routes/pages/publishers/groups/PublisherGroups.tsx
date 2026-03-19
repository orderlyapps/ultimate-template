import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherGroupsList } from "@feature/db/publisher/lists/publisher-groups-list/PublisherGroupsList";
import { Space } from "@layout/space/Space";

export const PublisherGroups: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonTitle>Groups</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Groups</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <PublisherGroupsList />
      </IonContent>
    </IonPage>
  );
};
