import { Maps } from "@feature/maps/door-to-door/components/sources/maps/Maps";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";

export const DoorToDoor: React.FC = () => {
  const setMapRef = useDoorToDoorStore((state) => state.setMapRef);

  return (
    <Map id="door-to-door" ref={setMapRef}>
      <Maps />
    </Map>
  );
};
