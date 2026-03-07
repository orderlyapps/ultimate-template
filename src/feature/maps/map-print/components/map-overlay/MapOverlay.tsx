import { IonButton, IonIcon } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import type { Map } from "@tanstack-db/map/mapSchema";
import { useMapPrintStore } from "@feature/maps/map-print/store/use-map-print-store";

type MapOverlayProps = {
  map: Map;
};

export const MapOverlay: React.FC<MapOverlayProps> = ({ map }) => {
  const { styling, setIsStyleModalOpen } = useMapPrintStore();

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "white",
          padding: "12px 16px",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: styling.mapNameSize,
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {map.name}
          {map.details && (
            <span
              style={{
                color: "black",
                fontSize: styling.mapDetailsSize,
                textAlign: "left",
                marginTop: 4,
                fontWeight: 400,
              }}
            >
              {" " + map.details}
            </span>
          )}
        </div>
      </div>
      <IonButton
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 10,
        }}
        onClick={() => setIsStyleModalOpen(true)}
      >
        <IonIcon icon={settingsOutline} slot="start" />
        Style
      </IonButton>
    </>
  );
};
