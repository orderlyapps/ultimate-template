import { IonItem, IonLabel } from "@ionic/react";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";
import type { PublisherWithAddresses } from "@feature/maps/publisher-addresses/components/publisher-list-modal/hooks/usePublishersWithAddresses";

interface PublisherListItemProps {
  publisher: PublisherWithAddresses;
  onSelect: () => void;
}

export const PublisherListItem: React.FC<PublisherListItemProps> = ({
  publisher,
  onSelect,
}) => {
  const mapRef = usePublisherAddressesStore((state) => state.mapRef);

  const handleClick = () => {
    const firstAddress = publisher.addresses[0];
    if (firstAddress && mapRef) {
      mapRef.flyTo({
        center: firstAddress.coordinates,
        zoom: 17,
        duration: 1200,
      });
    }
    onSelect();
  };

  const addressCount = publisher.addresses.length;
  const addressLabel =
    addressCount === 1 ? "1 address" : `${addressCount} addresses`;

  return (
    <IonItem button onClick={handleClick}>
      <IonLabel>
        <h2>{publisher.name}</h2>
        <p>{addressLabel}</p>
      </IonLabel>
    </IonItem>
  );
};
