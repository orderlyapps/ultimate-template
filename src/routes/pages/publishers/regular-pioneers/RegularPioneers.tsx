import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RegularPioneersList } from "@feature/db/publisher/lists/regular-pioneers-list/RegularPioneersList";
import { Space } from "@layout/space/Space";

export const RegularPioneers: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonTitle>Regular Pioneers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Regular Pioneers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <RegularPioneersList />
      </IonContent>
    </IonPage>
  );
};
