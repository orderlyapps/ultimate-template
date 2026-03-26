import { IonPage, IonContent } from "@ionic/react";
import { HomeContent } from "@/content/home/HomeContent";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <HomeContent />
      </IonContent>
    </IonPage>
  );
};
