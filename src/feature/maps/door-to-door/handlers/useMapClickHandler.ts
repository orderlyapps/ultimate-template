import type { MapMouseEvent } from "react-map-gl/mapbox";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import type { DoNotCall } from "@feature/maps/door-to-door/components/sources/do-not-calls/DoNotCalls";

export const useMapClickHandler = () => {
  const setSelectedDoNotCall = useDoorToDoorStore(
    (state) => state.setSelectedDoNotCall,
  );

  const handleMapClick = ({ features }: MapMouseEvent) => {
    if (!features?.[0]) return;

    if (features?.[0].source === "do-not-calls") {
      setSelectedDoNotCall(features[0].properties as DoNotCall);
    }
  };

  return handleMapClick;
};
