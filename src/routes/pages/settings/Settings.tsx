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
        </IonList>
      </IonContent>
    </IonPage>
  );
};
