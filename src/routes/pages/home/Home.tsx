import { IonPage, IonContent } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { PublisherHomeView2 } from "@feature/db/publisher/publisher-home-view-2/PublisherHomeView2";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Label } from "@ionic-display/label/Label";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { useAppFeaturesStore } from "@services/app/features/useAppFeaturesStore";

export const Home: React.FC = () => {
  const [congregation] = useUserCongregation();
  const isTalksEnabled = useAppFeaturesStore((s) => s.isEnabled("talks"));
  const isMapPrintEnabled = useAppFeaturesStore((s) => s.isEnabled("mapPrint"));
  const hasAnyToolEnabled = isTalksEnabled || isMapPrintEnabled;

  const show = import.meta.env.VITE_IS_BETA;

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
          <PublisherHomeView2 />
        )}

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
        <List>
          {show && (
            <NavItem routerLink="/home/announcements">Announcements</NavItem>
          )}
          {hasAnyToolEnabled && (
            <NavItem routerLink="/home/tools">Tools</NavItem>
          )}
        </List>
      </IonContent>
    </IonPage>
  );
};
