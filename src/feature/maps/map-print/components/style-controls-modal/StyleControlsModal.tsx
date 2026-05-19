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
  IonInput,
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
            <IonInput
              label="Road Width"
              type="number"
              min="1.5"
              max="3"
              step="0.1"
              value={String(styling.roadWidth)}
              onIonChange={(e) => {
                const value = parseFloat(e.detail.value as string);
                if (!isNaN(value)) setStyling({ roadWidth: value });
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Road Label Size"
              type="number"
              min="0.5"
              max="4"
              step="0.05"
              value={String(styling.roadLabelSize)}
              onIonChange={(e) => {
                const value = parseFloat(e.detail.value as string);
                if (!isNaN(value)) setStyling({ roadLabelSize: value });
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Text Size (px)"
              type="number"
              min="12"
              max="188"
              step="1"
              value={String(styling.mapNameSize)}
              onIonChange={(e) => {
                const value = parseInt(e.detail.value as string, 10);
                if (!isNaN(value)) {
                  setStyling({ mapNameSize: value, mapDetailsSize: Math.round(value * 0.8) });
                }
              }}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Border Width"
              type="number"
              min="0.5"
              max="5"
              step="0.1"
              value={String(styling.borderWidth)}
              onIonChange={(e) => {
                const value = parseFloat(e.detail.value as string);
                if (!isNaN(value)) setStyling({ borderWidth: value });
              }}
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};
