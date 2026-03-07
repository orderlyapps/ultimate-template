import { Map } from "@services/vendor/mapbox/components/map/Map";
import { MapSelectionModal } from "@feature/maps/map-print/components/map-selection-modal/MapSelectionModal";
import { MapOverlay } from "@feature/maps/map-print/components/map-overlay/MapOverlay";
import { StyleControlsModal } from "@feature/maps/map-print/components/style-controls-modal/StyleControlsModal";
import { useMapPrintStore } from "@feature/maps/map-print/store/use-map-print-store";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@tanstack-db/map/mapCollection";
import { Maps } from "@feature/maps/map-print/sources/maps/Maps";
import { useEffect, useRef } from "react";
import { LngLatBounds } from "mapbox-gl";
import type { Map as MapboxMap } from "mapbox-gl";

const MAP_ID = "map-print";

export const MapPrintContent: React.FC = () => {
  const { selectedMap, isModalOpen, setIsModalOpen, setSelectedMap } =
    useMapPrintStore();
  const previousMapId = useRef<string | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );

  useEffect(() => {
    if (
      !mapRef.current ||
      !selectedMap ||
      !selectedMap.boundary ||
      selectedMap.boundary.length === 0 ||
      selectedMap.id === previousMapId.current
    ) {
      return;
    }

    previousMapId.current = selectedMap.id;

    const zoomToMap = () => {
      if (!mapRef.current) return;

      if (!mapRef.current.isStyleLoaded()) {
        setTimeout(zoomToMap, 100);
        return;
      }

      const bounds = new LngLatBounds();
      selectedMap.boundary?.forEach(([lng, lat]) => {
        bounds.extend([lng, lat]);
      });
      mapRef.current.fitBounds(bounds, { duration: 1500, padding: 50 });
    };

    setTimeout(zoomToMap, 300);
  }, [selectedMap]);
  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Map
          id={MAP_ID}
          onLoad={(e) => {
            mapRef.current = e.target;
          }}
          maxZoom={20}
        >
          <Maps />
        </Map>
        {selectedMap && <MapOverlay map={selectedMap} />}
      </div>

      <MapSelectionModal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        maps={maps}
        onSelectMap={(map) => {
          setSelectedMap(map);
          setIsModalOpen(false);
        }}
        selectedMapId={selectedMap?.id}
      />

      <StyleControlsModal />
    </>
  );
};
