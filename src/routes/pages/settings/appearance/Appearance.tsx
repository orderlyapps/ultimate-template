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
import { SelectTheme } from "@services/app/theme/SelectTheme";

export const Appearance: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>Appearance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Appearance</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <SelectTheme />
      </IonContent>
    </IonPage>
  );
};
