import type { Map } from "@tanstack-db/map/mapSchema";

type MapOverlayProps = {
  map: Map;
};

export const MapOverlay: React.FC<MapOverlayProps> = ({ map }) => {
  return (
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
          fontSize: 18,
          fontWeight: 600,
          textAlign: "left",
        }}
      >
        {map.name}
      </div>
      {map.details && (
        <div
          style={{
            color: "black",
            fontSize: 14,
            textAlign: "left",
            marginTop: 4,
          }}
        >
          {map.details}
        </div>
      )}
    </div>
  );
};
