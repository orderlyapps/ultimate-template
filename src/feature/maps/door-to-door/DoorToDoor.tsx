import { Maps } from "@feature/maps/door-to-door/components/sources/maps/Maps";
import { Map } from "@services/vendor/mapbox/components/map/Map";

export const DoorToDoor: React.FC = () => {
  return (
    <Map id="door-to-door">
      <Maps />
    </Map>
  );
};
