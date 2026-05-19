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
import { useHotkey } from "@tanstack/react-hotkeys";

const MAP_ID = "map-print";

export const MapPrintContent: React.FC = () => {
  const {
    selectedMap,
    isModalOpen,
    setIsModalOpen,
    setSelectedMap,
    isStyleModalOpen,
    setIsStyleModalOpen,
    styling,
    setStyling,
  } = useMapPrintStore();
  const previousMapId = useRef<string | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  // Toggle style modal with Mod+Alt+S
  useHotkey(
    "Mod+Alt+S",
    () => {
      setIsStyleModalOpen(!isStyleModalOpen);
    },
    { preventDefault: true }
  );

  // Road width: Mod+Alt+Q / W
  useHotkey(
    "Mod+Alt+9",
    () => {
      const newValue = Math.max(styling.roadWidth - 0.1, 1.5);
      setStyling({ roadWidth: Math.round(newValue * 10) / 10 });
    },
    { preventDefault: true }
  );

  useHotkey(
    "Mod+Alt+0",
    () => {
      const newValue = Math.min(styling.roadWidth + 0.1, 3);
      setStyling({ roadWidth: Math.round(newValue * 10) / 10 });
    },
    { preventDefault: true }
  );

  // Road label size: Mod+Alt+E / R
  useHotkey(
    "Mod+Alt+O",
    () => {
      const newValue = Math.max(styling.roadLabelSize - 0.05, 0.5);
      setStyling({ roadLabelSize: Math.round(newValue * 20) / 20 });
    },
    { preventDefault: true }
  );

  useHotkey(
    "Mod+Alt+P",
    () => {
      const newValue = Math.min(styling.roadLabelSize + 0.05, 4);
      setStyling({ roadLabelSize: Math.round(newValue * 20) / 20 });
    },
    { preventDefault: true }
  );

  // Text size: Mod+Alt+Z / X
  useHotkey(
    "Mod+Alt+L",
    () => {
      const newValue = Math.max(styling.mapNameSize - 1, 12);
      setStyling({
        mapNameSize: newValue,
        mapDetailsSize: Math.round(newValue * 0.8),
      });
    },
    { preventDefault: true }
  );

  useHotkey(
    "Mod+Alt+;",
    () => {
      const newValue = Math.min(styling.mapNameSize + 1, 188);
      setStyling({
        mapNameSize: newValue,
        mapDetailsSize: Math.round(newValue * 0.8),
      });
    },
    { preventDefault: true }
  );

  // Border width: Mod+Alt+C / V
  useHotkey(
    "Mod+Alt+.",
    () => {
      const newValue = Math.max(styling.borderWidth - 0.1, 0.5);
      setStyling({ borderWidth: Math.round(newValue * 10) / 10 });
    },
    { preventDefault: true }
  );

  useHotkey(
    "Mod+Alt+/",
    () => {
      const newValue = Math.min(styling.borderWidth + 0.1, 5);
      setStyling({ borderWidth: Math.round(newValue * 10) / 10 });
    },
    { preventDefault: true }
  );

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
