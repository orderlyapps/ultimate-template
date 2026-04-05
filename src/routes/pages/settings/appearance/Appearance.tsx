import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Space } from "@layout/space/Space";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { SelectTheme } from "@services/app/theme/SelectTheme";
import { ReorderAccordionsModal } from "@/content/home/content/home-accordions/components/reorder-accordions-modal/ReorderAccordionsModal";

export const Appearance: React.FC = () => {
  const [isReorderOpen, setIsReorderOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>Appearance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Appearance</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <SelectTheme />
        <Space height="2" />
        <List>
          <Item button detail onClick={() => setIsReorderOpen(true)}>
            <IonLabel>
              <Text>Reorder Home Sections</Text>
            </IonLabel>
          </Item>
        </List>
        <ReorderAccordionsModal
          isOpen={isReorderOpen}
          onDismiss={() => setIsReorderOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};
