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

export const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar id="collapse">
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List>
          <NavItem routerLink="/settings/profile">Profile</NavItem>
          <NavItem routerLink="/settings/appearance">Appearance</NavItem>
          <NavItem routerLink="/settings/features">Features</NavItem>
          <NavItem routerLink="/settings/help-text">Help Text</NavItem>
          <NavItem routerLink="/settings/app-details">App Details</NavItem>
        </List>
      </IonContent>
    </IonPage>
  );
};
