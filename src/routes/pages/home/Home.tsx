import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { NavItem } from "@navigation/nav-item/NavItem";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <NavItem routerLink="/home/test">Go to Test Page</NavItem>
      </IonContent>
    </IonPage>
  );
};
