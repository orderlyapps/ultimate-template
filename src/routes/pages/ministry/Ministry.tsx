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
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";

export const Ministry: React.FC = () => {
  const [congregation] = useUserCongregation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ministry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {congregation?.id !== "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
          <List>
            <Space />
            <Item className="ion-text-center" lines="none">
              <Label>
                <Text size="lg">Go to Settings {">"} Profile to reset app</Text>
              </Label>
            </Item>
          </List>
        )}

        {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
          <>
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
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
