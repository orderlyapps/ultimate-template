import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { BuildInfo } from "@services/app/details/build-info/BuildInfo";
import { OpenSourceLicenses } from "@services/app/details/open-source-licenses/OpenSourceLicenses";
import { Space } from "@layout/space/Space";

export const AppDetails: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>App Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <Space height="2" />
          <BuildInfo />
          <Space height="2" />
          <OpenSourceLicenses />
        </List>
        <Space />
      </IonContent>
    </IonPage>
  );
};
