import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { LngLatBounds } from "mapbox-gl";

export const useZoomToMap = () => {
  const mapRef = useDoorToDoorStore((state) => state.mapRef);
  const setSelectedMapId = useDoorToDoorStore(
    (state) => state.setSelectedMapId,
  );
  const closeMapListModal = useDoorToDoorStore(
    (state) => state.closeMapListModal,
  );

  const handleZoomToMap = (mapId: string, boundary: number[][]) => {
    if (!mapRef || !boundary || boundary.length === 0) return;

    closeMapListModal();

    setTimeout(() => {
      const bounds = new LngLatBounds();
      boundary.forEach(([lng, lat]) => {
        bounds.extend([lng, lat]);
      });

      mapRef.fitBounds(bounds, {
        duration: 3000,
      });

      setSelectedMapId(mapId);
    }, 300);
  };

  return { handleZoomToMap };
};
