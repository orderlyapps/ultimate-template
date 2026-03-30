import { MapMaster } from "@feature/maps/sources/map-master/MapMaster";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { PublishersModal } from "@/content/publishers/map/publishers-modal/PublishersModal";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";

export const PublishersMapContent: React.FC = () => {
  const setMapRef = usePublishersMapStore((state) => state.setMapRef);

  return (
    <>
      <Map id="publishers-map" ref={setMapRef}>
        <MapMaster />
      </Map>
      <PublishersModal />
    </>
  );
};
