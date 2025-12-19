import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";

export const Ministry: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ministry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Ministry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
      </IonContent>
    </IonPage>
  );
};
