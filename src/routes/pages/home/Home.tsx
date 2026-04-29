import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useState } from "react";
import { ReorderAccordionsModal } from "@/content/home/content/home-accordions/components/reorder-accordions-modal/ReorderAccordionsModal";
import { HomeContent } from "@/content/home/HomeContent";
// import { formatPublisherName } from "@format/formatPublisherName";
import { useUserPublisher } from "@feature/db/publisher/user-publisher/use-user-publisher/useUserPublisher";
import { Text } from "@ionic-display/text/Text";

export const Home: React.FC = () => {
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [publisher] = useUserPublisher();

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Proclaimer</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsReorderOpen(true)}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense" mode="ios">
          <IonToolbar>
            <IonTitle>
              <Text size="lg">Welcome</Text>
            </IonTitle>
          </IonToolbar>
          {publisher && (
            <>
              <IonToolbar>
                <IonTitle>
                  <Text size="xxxl">
                    {publisher.display_name || publisher.first_name}
                  </Text>
                </IonTitle>
              </IonToolbar>
              <IonToolbar>
                <IonTitle>
                  <Text size="xxxl">{publisher.last_name}</Text>
                </IonTitle>
              </IonToolbar>
            </>
          )}
        </IonHeader>
        <HomeContent />
      </IonContent>
      <ReorderAccordionsModal
        isOpen={isReorderOpen}
        onDismiss={() => setIsReorderOpen(false)}
      />
    </IonPage>
  );
};
