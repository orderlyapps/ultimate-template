import { Maps } from "@feature/maps/door-to-door/sources/maps/Maps";
import { MapMaster } from "@feature/maps/door-to-door/sources/map-master/MapMaster";
import { DoNotCalls } from "@feature/maps/door-to-door/sources/do-not-calls/DoNotCalls";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { GetDirectionsAlert } from "@feature/maps/door-to-door/components/get-directions-alert/GetDirectionsAlert";
import { DoNotCallAlert } from "@feature/maps/door-to-door/components/do-not-calls/do-not-call-alert/DoNotCallAlert";
import { NotAtHomeAlert } from "@feature/maps/door-to-door/components/not-at-homes/components/not-at-home-alert/NotAtHomeAlert";
import { NotAtHomeUnitModal } from "@feature/maps/door-to-door/components/not-at-homes/components/not-at-home-unit-modal/NotAtHomeUnitModal";
import { DoNotCallUnitModal } from "@feature/maps/door-to-door/components/do-not-calls/do-not-call-unit-modal/DoNotCallUnitModal";
import { AddAddressModal } from "@feature/maps/door-to-door/components/add-address-modal/AddAddressModal";
import { useMapClickHandler } from "@feature/maps/door-to-door/handlers/useMapClickHandler";
import type { MapTouchEvent } from "react-map-gl/mapbox";
import { NotAtHome } from "@feature/maps/door-to-door/sources/not-at-home/NotAtHome";

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
        interactiveLayerIds={[
          "do-not-call-house-points",
          "do-not-call-unit-points",
          "not-at-home-house-points",
          "not-at-home-unit-points",
          "not-at-home-cluster-points",
        ]}
        onClick={handleMapClick}
      >
        <MapMaster />
        <Maps />
        <DoNotCalls />
        <NotAtHome />
      </Map>
      <GetDirectionsAlert />
      <DoNotCallAlert />
      <NotAtHomeAlert />
      <NotAtHomeUnitModal />
      <DoNotCallUnitModal />
      <AddAddressModal />
    </>
  );
};
