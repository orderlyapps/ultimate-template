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
import { useFeatureAccess } from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { HomeAccordions } from "@feature/home/home-accordions/HomeAccordions";

export const Home: React.FC = () => {
  const [congregation] = useUserCongregation();
  const isTalksEnabled = useAppFeaturesStore((s) => s.isEnabled("talks"));
  const isMapPrintEnabled = useAppFeaturesStore((s) => s.isEnabled("mapPrint"));
  const hasAnyToolEnabled = isTalksEnabled || isMapPrintEnabled;

  const { isUnlocked } = useFeatureAccess(["damian"]);

  return (
    <IonPage>
      <IonContent>
        {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
          <PublisherHomeView2 />
        )}
        <Space height="2" />
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
        <HomeAccordions />
        <List>
          {hasAnyToolEnabled && isUnlocked && (
            <NavItem routerLink="/home/tools">Tools</NavItem>
          )}
        </List>
        <Space />
      </IonContent>
    </IonPage>
  );
};
