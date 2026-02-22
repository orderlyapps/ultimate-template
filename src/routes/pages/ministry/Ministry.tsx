import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { Space } from "@layout/space/Space";
import { NavItem } from "@navigation/nav-item/NavItem";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";

export const Ministry: React.FC = () => {
  const [congregation] = useUserCongregation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ministry</IonTitle>
        </IonToolbar>
      </IonHeader>
      {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
        <IonContent fullscreen className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Ministry</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Space height="2" />
          <NavItem routerLink="/ministry/door-to-door">Door to Door</NavItem>
          <NavItem routerLink="/ministry/letter-writing">
            Letter Writing
          </NavItem>
          <NavItem routerLink="/ministry/maps">Maps</NavItem>
          <NavItem routerLink="/ministry/schedule">Schedule</NavItem>
        </IonContent>
      )}
    </IonPage>
  );
};
