import { Maps } from "@feature/maps/door-to-door/components/sources/maps/Maps";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { MapLocationAlert } from "@feature/maps/door-to-door/components/map-location-alert/MapLocationAlert";
import type { MapTouchEvent } from "react-map-gl/mapbox";

export const DoorToDoor: React.FC = () => {
  const setMapRef = useDoorToDoorStore((state) => state.setMapRef);
  const setInlineAlert = useDoorToDoorStore((state) => state.setInlineAlert);

  const handleLongPress = (event: MapTouchEvent) => {
    const { lat, lng } = event.lngLat;
    setInlineAlert({ lat, lng });
  };

  return (
    <>
      <Map id="door-to-door" ref={setMapRef} onLongPress={handleLongPress}>
        <Maps />
      </Map>
      <MapLocationAlert />
    </>
  );
};
