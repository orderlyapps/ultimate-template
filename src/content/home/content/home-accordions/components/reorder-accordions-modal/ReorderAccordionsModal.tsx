import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  type ReorderEndCustomEvent,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import {
  ACCORDION_LABELS,
  useHomeAccordionOrderStore,
} from "@/content/home/content/home-accordions/store/useHomeAccordionOrderStore";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export function ReorderAccordionsModal({ isOpen, onDismiss }: Props) {
  const order = useHomeAccordionOrderStore((s) => s.order);
  const reorder = useHomeAccordionOrderStore((s) => s.reorder);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reorder Sections</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          <IonReorderGroup
            disabled={false}
            onIonReorderEnd={(e: ReorderEndCustomEvent) => {
              reorder(e.detail.from, e.detail.to);
              e.detail.complete();
            }}
          >
            {order.map((id) => (
              <Item key={id}>
                <IonReorder slot="start" />
                <IonLabel>
                  <Text>{ACCORDION_LABELS[id]}</Text>
                </IonLabel>
              </Item>
            ))}
          </IonReorderGroup>
        </List>
      </IonContent>
    </IonModal>
  );
}
