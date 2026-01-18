import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import type { Map } from "@tanstack-db/map/mapSchema";
import { LngLatBounds } from "mapbox-gl";

export const useZoomToMap = () => {
  const mapRef = useDoorToDoorStore((state) => state.mapRef);
  const setSelectedMapName = useDoorToDoorStore(
    (state) => state.setSelectedMapName,
  );
  const closeMapListModal = useDoorToDoorStore(
    (state) => state.closeMapListModal,
  );

  const handleZoomToMap = (map: Map) => {
    if (!mapRef || !map.boundary || map.boundary.length === 0) return;

    closeMapListModal();

    setTimeout(() => {
      const bounds = new LngLatBounds();
      map.boundary?.forEach(([lng, lat]) => {
        bounds.extend([lng, lat]);
      });

      mapRef.fitBounds(bounds, {
        duration: 3000,
      });

      setSelectedMapName(map.name);
    }, 300);
  };

  return { handleZoomToMap };
};
