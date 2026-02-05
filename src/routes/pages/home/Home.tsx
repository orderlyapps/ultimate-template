import { IonPage, IonContent } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { PublisherHomeView } from "@feature/db/publisher/publisher-home-view/PublisherHomeView";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <PublisherHomeView />
        <List>
          <FeatureGuard id="talks">
            <NavItem routerLink="/home/talks">Talks</NavItem>
          </FeatureGuard>
        </List>
      </IonContent>
    </IonPage>
  );
};
