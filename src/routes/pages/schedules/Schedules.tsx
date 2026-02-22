import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { format, startOfWeek } from "date-fns";
import { Space } from "@layout/space/Space";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";

export const Schedules: React.FC = () => {
  const [congregation] = useUserCongregation();
  const currentWeekId = format(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedules</IonTitle>
        </IonToolbar>
      </IonHeader>
      {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
        <IonContent fullscreen className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Schedules</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Space height="2" />
          <List>
            <NavItem routerLink={`/schedules/midweek-meeting/${currentWeekId}`}>
              Midweek Meeting
            </NavItem>
            <NavItem routerLink={`/schedules/weekend-meeting/${currentWeekId}`}>
              Weekend Meeting
            </NavItem>
            {/* <NavItem routerLink="/schedules/audio-and-video">Audio & Video</NavItem> */}
            <NavItem routerLink="/schedules/cleaning">Cleaning</NavItem>
            <NavItem routerLink="/schedules/events">Events</NavItem>
          </List>
        </IonContent>
      )}
    </IonPage>
  );
};
