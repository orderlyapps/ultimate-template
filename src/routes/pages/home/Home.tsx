import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { NavItem } from "@navigation/nav-item/NavItem";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <NavItem routerLink="/home/test">Go to Test Page</NavItem>
      </IonContent>
    </IonPage>
  );
};
