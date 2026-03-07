import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonRange,
} from "@ionic/react";
import { useMapPrintStore } from "@feature/maps/map-print/store/use-map-print-store";

export const StyleControlsModal: React.FC = () => {
  const { isStyleModalOpen, setIsStyleModalOpen, styling, setStyling } =
    useMapPrintStore();

  return (
    <IonModal isOpen={isStyleModalOpen} onDidDismiss={() => setIsStyleModalOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map Style Controls</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsStyleModalOpen(false)}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Road Width</h2>
              <p>Multiplier: {styling.roadWidth.toFixed(1)}x</p>
            </IonLabel>
            <IonRange
              min={1.5}
              max={3}
              step={0.1}
              value={styling.roadWidth}
              onIonChange={(e) => setStyling({ roadWidth: e.detail.value as number })}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Road Label Size</h2>
              <p>Multiplier: {styling.roadLabelSize.toFixed(1)}x</p>
            </IonLabel>
            <IonRange
              min={1.5}
              max={4}
              step={0.1}
              value={styling.roadLabelSize}
              onIonChange={(e) => setStyling({ roadLabelSize: e.detail.value as number })}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Map Name Size</h2>
              <p>{styling.mapNameSize}px</p>
            </IonLabel>
            <IonRange
              min={48}
              max={188}
              step={1}
              value={styling.mapNameSize}
              onIonChange={(e) => setStyling({ mapNameSize: e.detail.value as number })}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Map Details Size</h2>
              <p>{styling.mapDetailsSize}px</p>
            </IonLabel>
            <IonRange
              min={48}
              max={188}
              step={1}
              value={styling.mapDetailsSize}
              onIonChange={(e) => setStyling({ mapDetailsSize: e.detail.value as number })}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Border Width</h2>
              <p>Multiplier: {styling.borderWidth.toFixed(1)}x</p>
            </IonLabel>
            <IonRange
              min={0.5}
              max={5}
              step={0.1}
              value={styling.borderWidth}
              onIonChange={(e) => setStyling({ borderWidth: e.detail.value as number })}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
