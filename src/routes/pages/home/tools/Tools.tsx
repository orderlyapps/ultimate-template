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
import { NavItem } from "@navigation/nav-item/NavItem";
import { FeatureGuard } from "@services/app/features/FeatureGuard";

export const Tools: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Home" />
          </IonButtons>
          <IonTitle>Tools</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tools</IonTitle>
          </IonToolbar>
        </IonHeader>
        <List>
          <FeatureGuard id="talks">
            <NavItem routerLink="/home/talks">Talks</NavItem>
          </FeatureGuard>
          <FeatureGuard id="mapPrint">
            <NavItem routerLink="/home/map-print">Map Print</NavItem>
          </FeatureGuard>
          <FeatureGuard id="groups">
            <NavItem routerLink="/home/groups">Groups</NavItem>
          </FeatureGuard>
        </List>
      </IonContent>
    </IonPage>
  );
};
