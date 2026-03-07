import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import type { Map } from "@tanstack-db/map/mapSchema";

type MapSelectionModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
  maps: Map[] | undefined;
  onSelectMap: (map: Map) => void;
  selectedMapId: string | undefined;
};

export const MapSelectionModal: React.FC<MapSelectionModalProps> = ({
  isOpen,
  onDismiss,
  maps,
  onSelectMap,
  selectedMapId,
}) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select a Map</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List>
          {maps?.map((map) => (
            <Item
              key={map.id}
              onClick={() => onSelectMap(map)}
              color={map.id === selectedMapId ? "medium" : ""}
            >
              <Text bold={map.id === selectedMapId}>{map.name}</Text>
            </Item>
          ))}
        </List>
      </IonContent>
    </IonModal>
  );
};
