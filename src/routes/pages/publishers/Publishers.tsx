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

export const Publishers: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Publishers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List>
          <NavItem routerLink="/publishers/all">All Publishers</NavItem>
          <NavItem routerLink="/publishers/groups">Groups</NavItem>
          <NavItem routerLink="/publishers/appointed">Appointed</NavItem>
          <NavItem routerLink="/publishers/regular-pioneers">Regular Pioneers</NavItem>
        </List>
      </IonContent>
    </IonPage>
  );
};
