import type { MapMouseEvent } from "react-map-gl/mapbox";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import type { DoNotCall } from "@feature/maps/door-to-door/sources/do-not-calls/DoNotCalls";
import type { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";

export const useMapClickHandler = () => {
  const setSelectedDoNotCall = useDoorToDoorStore(
    (state) => state.setSelectedDoNotCall,
  );

  const setSelectedNotAtHome = useDoorToDoorStore(
    (state) => state.setSelectedNotAtHome,
  );

  const handleMapClick = ({ features }: MapMouseEvent) => {
    if (!features?.[0]) return;

    if (features?.[0].source === "do-not-calls") {
      setSelectedDoNotCall(features[0].properties as DoNotCall);
    }

    if (features?.[0].layer?.id === "not-at-home-points") {
      console.log(features[0]);
      setSelectedNotAtHome(features[0].properties as NotAtHome);
    }

    if (features?.[0].layer?.id === "not-at-home-cluster-points") {
      console.log(features[0]);
      setSelectedNotAtHome(features[0].properties as NotAtHome);
    }
  };

  return handleMapClick;
};
