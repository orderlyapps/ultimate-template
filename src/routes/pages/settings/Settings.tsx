import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { OpenSourceLicenses } from "@services/app/details/open-source-licenses/OpenSourceLicenses";
import { BuildInfo } from "@services/app/details/build-info/BuildInfo";
import { AuthSection } from "@services/app/auth/AuthSection";
import { SelectTheme } from "@services/app/theme/SelectTheme";
import { List } from "@ionic-layout/list/List";

export const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <SelectTheme />
          <AuthSection />
          <BuildInfo />
          <OpenSourceLicenses />
        </List>
      </IonContent>
    </IonPage>
  );
};
