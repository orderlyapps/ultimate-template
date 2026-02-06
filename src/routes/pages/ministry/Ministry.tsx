import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { NavItem } from "@navigation/nav-item/NavItem";

export const Ministry: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ministry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ministry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <NavItem routerLink="/ministry/door-to-door">Door to Door</NavItem>
        <NavItem routerLink="/ministry/letter-writing">Letter Writing</NavItem>
        <NavItem routerLink="/ministry/maps">Maps</NavItem>
        <NavItem routerLink="/ministry/schedule">Schedule</NavItem>
      </IonContent>
    </IonPage>
  );
};
