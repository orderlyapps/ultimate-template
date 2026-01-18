import { MapListModal } from "@feature/maps/door-to-door/components/map-list-modal/MapListModal";
import { DoorToDoor as Content } from "@feature/maps/door-to-door/DoorToDoor";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { MapSettingsModal } from "@feature/maps/map-settings-modal/MapSettingsModal";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useZoomToMap } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/hooks/use-zoom-to-map";

export const DoorToDoor: React.FC = () => {
  const selectedMap = useDoorToDoorStore((state) => state.selectedMap);

  const { handleZoomToMap } = useZoomToMap();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/ministry" text="Ministry" />
          </IonButtons>
          <IonTitle onClick={() => handleZoomToMap(selectedMap)}>
            {selectedMap?.name}
          </IonTitle>
          <IonButtons slot="end">
            <MapListModal />
            <MapSettingsModal id="door-to-door" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent id="fullscreen">
        <Content />
      </IonContent>
    </IonPage>
  );
};
