import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { Space } from "@layout/space/Space";

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
          <IonToolbar id="collapse">
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List>
          <NavItem routerLink="/home/talks">Talks</NavItem>
        </List>
      </IonContent>
    </IonPage>
  );
};
