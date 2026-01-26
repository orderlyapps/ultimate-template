import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";

export const Schedules: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedules</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Schedules</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List>
          <NavItem routerLink="/schedules/midweek-meeting">Midweek Meeting</NavItem>
          <NavItem routerLink="/schedules/weekend-meeting">Weekend Meeting</NavItem>
          <NavItem routerLink="/schedules/audio-and-video">Audio & Video</NavItem>
          <NavItem routerLink="/schedules/cleaning">Cleaning</NavItem>
          <NavItem routerLink="/schedules/events">Events</NavItem>
        </List>
      </IonContent>
    </IonPage>
  );
};
