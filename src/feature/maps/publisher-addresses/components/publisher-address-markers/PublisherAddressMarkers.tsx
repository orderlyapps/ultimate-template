import { Marker } from "react-map-gl/mapbox";
import { usePublisherAddresses } from "@feature/maps/publisher-addresses/hooks/usePublisherAddresses";

export const PublisherAddressMarkers: React.FC = () => {
  const addresses = usePublisherAddresses();

  return (
    <>
      {addresses.map((address) => (
        <Marker
          key={address.id}
          longitude={address.coordinates[0]}
          latitude={address.coordinates[1]}
          anchor="bottom"
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#3880ff",
              border: "2px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          />
        </Marker>
      ))}
    </>
  );
};
