import { Maps } from "@feature/maps/door-to-door/components/sources/maps/Maps";
import { DoNotCalls } from "@feature/maps/door-to-door/components/sources/do-not-calls/DoNotCalls";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { MapLocationAlert } from "@feature/maps/door-to-door/components/map-location-alert/MapLocationAlert";
import { DoNotCallAlert } from "@feature/maps/door-to-door/components/do-not-call-alert/DoNotCallAlert";
import { useMapClickHandler } from "@feature/maps/door-to-door/handlers/useMapClickHandler";
import type { MapTouchEvent } from "react-map-gl/mapbox";

export const DoorToDoor: React.FC = () => {
  const setMapRef = useDoorToDoorStore((state) => state.setMapRef);
  const setInlineAlert = useDoorToDoorStore((state) => state.setInlineAlert);
  const handleMapClick = useMapClickHandler();

  const handleLongPress = (event: MapTouchEvent) => {
    const { lat, lng } = event.lngLat;
    setInlineAlert({ lat, lng });
  };

  return (
    <>
      <Map
        id="door-to-door"
        ref={setMapRef}
        onLongPress={handleLongPress}
        interactiveLayerIds={["do-not-call-points"]}
        onClick={handleMapClick}
      >
        <Maps />
        <DoNotCalls />
      </Map>
      <MapLocationAlert />
      <DoNotCallAlert />
    </>
  );
};
