import { MapMaster } from "@feature/maps/sources/map-master/MapMaster";
import { PublishersAddresses } from "@feature/maps/sources/publishers/Publishers";
import { Map } from "@services/vendor/mapbox/components/map/Map";
import { PublishersModal } from "@/content/publishers/map/publishers-modal/PublishersModal";
import { HouseholdDetailModal } from "@/content/publishers/map/household-detail-modal/HouseholdDetailModal";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";
import { usePublishersQuery } from "@/content/publishers/map/publishers-modal/publishers-list/use-publishers-query";

export const PublishersMapContent: React.FC = () => {
  const setMapRef = usePublishersMapStore((state) => state.setMapRef);
  const { data: publishers } = usePublishersQuery();

  return (
    <>
      <Map id="publishers-map" ref={setMapRef}>
        <MapMaster />
        <PublishersAddresses publishers={publishers} />
      </Map>
      <PublishersModal />
      <HouseholdDetailModal />
    </>
  );
};
