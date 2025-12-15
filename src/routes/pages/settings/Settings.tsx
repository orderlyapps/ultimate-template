import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import { OpenSourceLicenses } from "@services/app/details/open-source-licenses/OpenSourceLicenses";
import { BuildInfo } from "@services/app/details/build-info/BuildInfo";
import { AuthSection } from "@services/app/auth/AuthSection";
import { SelectTheme } from "@services/app/theme/SelectTheme";

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
