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
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { Text } from "@ionic-display/text/Text";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { formatPublisherName } from "@format/formatPublisherName";

export const Home: React.FC = () => {
  const [publisher] = useUserPublisher();

  const name = publisher ? formatPublisherName(publisher, "display last") : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        {name && (
          <>
            <Text size="lg">{name}</Text>
            <Space height="2" />
          </>
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
