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
import { OpenSourceLicenses } from "@services/app/details/open-source-licenses/OpenSourceLicenses";
import { BuildInfo } from "@services/app/details/build-info/BuildInfo";

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
          <OpenSourceLicenses />
        </IonList>
      </IonContent>
    </IonPage>
  );
};
