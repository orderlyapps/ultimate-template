import { IonPage, IonContent } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { PublisherHomeView } from "@feature/db/publisher/publisher-home-view/PublisherHomeView";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Label } from "@ionic-display/label/Label";

export const Home: React.FC = () => {
  const [congregation] = useUserCongregation();
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
          <PublisherHomeView />
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
          <FeatureGuard id="talks">
            <NavItem routerLink="/home/talks">Talks</NavItem>
          </FeatureGuard>
        </List>
      </IonContent>
    </IonPage>
  );
};
