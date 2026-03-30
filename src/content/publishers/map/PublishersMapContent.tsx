import { MapMaster } from "@feature/maps/sources/map-master/MapMaster";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { PublishersModal } from "@/content/publishers/map/publishers-modal/PublishersModal";

export const PublishersMapContent: React.FC = () => {

  return (
    <>
      <Map id="publishers-map">
        <MapMaster />
      </Map>
      <PublishersModal />
    </>
  );
};
