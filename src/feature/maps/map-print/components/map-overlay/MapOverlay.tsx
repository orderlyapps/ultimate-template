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
          top: styling.mapDetailsSize / 2,
          left: styling.mapDetailsSize / 2,
          backgroundColor: "white",
          padding: styling.mapDetailsSize / 10,
          borderRadius: styling.mapDetailsSize / 10,
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
            paddingLeft: styling.mapDetailsSize / 4,
            paddingRight: styling.mapDetailsSize / 4,
          }}
        >
          {map.name}
          {map.details && (
            <span
              style={{
                color: "black",
                fontSize: styling.mapDetailsSize,
                textAlign: "left",
                fontWeight: 400,
                paddingLeft: styling.mapDetailsSize / 2,
              }}
            >
              {map.details}
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
