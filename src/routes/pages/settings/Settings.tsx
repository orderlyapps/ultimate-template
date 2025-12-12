import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import { SelectTheme } from "@feature/theme/SelectTheme";
import { AuthSection } from "@feature/auth/AuthSection";
import { BuildInfo } from "@feature/app/details/BuildInfo";

export const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset>
          <SelectTheme />
          <AuthSection />
          <BuildInfo />
        </IonList>
      </IonContent>
    </IonPage>
  );
};
