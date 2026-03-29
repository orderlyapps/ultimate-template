import { Map } from "@services/vendor/mapbox/components/map/Map";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";
import { PublisherAddressMarkers } from "@feature/maps/publisher-addresses/components/publisher-address-markers/PublisherAddressMarkers";
import { AddPublisherAddressModal } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/AddPublisherAddressModal";
import { PublisherListModal } from "@feature/maps/publisher-addresses/components/publisher-list-modal/PublisherListModal";

export const PublisherAddressesMap: React.FC = () => {
  const setMapRef = usePublisherAddressesStore((state) => state.setMapRef);

  return (
    <>
      <Map id="publisher-addresses" ref={setMapRef} maxZoom={22}>
        <PublisherAddressMarkers />
      </Map>
      <PublisherListModal />
      <AddPublisherAddressModal />
    </>
  );
};
