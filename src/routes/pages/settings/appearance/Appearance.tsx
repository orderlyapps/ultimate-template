import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
      <IonContent className="ion-padding">
        <SelectTheme />
      </IonContent>
    </IonPage>
  );
};
