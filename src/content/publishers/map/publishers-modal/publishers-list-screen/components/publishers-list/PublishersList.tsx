import { IonList, IonItem, IonLabel, IonSpinner, IonIcon, IonButton } from "@ionic/react";
import { usePublishersQuery } from "./use-publishers-query";
import { formatPublisherName } from "@format/formatPublisherName";
import { Text } from "@ionic-display/text/Text";
import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { useZoomToPublisher } from "./use-zoom-to-publisher";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import editIcon from "@icons/edit.svg";

export const PublishersList: React.FC = () => {
  const { data: publishers = [], isLoading } = usePublishersQuery();
  const { handlePublisherClick } = useZoomToPublisher();

  const setSelectedPublisher = usePublisherAddressStore(
    (state) => state.setSelectedPublisher
  );
  const setExistingAddress = usePublisherAddressStore(
    (state) => state.setExistingAddress
  );
  const setSuburb = usePublisherAddressStore((state) => state.setSuburb);
  const setStreet = usePublisherAddressStore((state) => state.setStreet);
  const setHouseNumber = usePublisherAddressStore(
    (state) => state.setHouseNumber
  );
  const setUnitNumber = usePublisherAddressStore(
    (state) => state.setUnitNumber
  );

  const handleEditAddress = (
    publisher: Publisher,
    publisherLocal: PublisherLocal | null
  ) => {
    setSelectedPublisher(publisher);

    const existingAddr = publisherLocal?.address?.[0] ?? null;
    setExistingAddress(existingAddr);

    if (existingAddr) {
      setSuburb({ id: "", congregation_id: "", name: existingAddr.suburb ?? "", bbox: [0, 0, 0, 0] });
      setStreet({ id: "", congregation_id: "", suburb_id: "", name: existingAddr.street ?? "", coordinates: [] });
      setHouseNumber(existingAddr.house_number ?? "");
      setUnitNumber(existingAddr.unit_number ?? "");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <IonSpinner />
      </div>
    );
  }

  if (!publishers.length) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>No publishers found</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList>
      {publishers.map(({ publisher, publisher_local }) => (
        <IonItem
          key={publisher.id}
          button
          onClick={() => handlePublisherClick(publisher_local)}
        >
          <IonLabel>
            <Text
              color={publisher_local?.address ? "" : "medium"}
              size={publisher_local?.address ? undefined : "sm"}
            >
              {formatPublisherName(publisher)}
            </Text>
          </IonLabel>
          <IonButton
            fill="clear"
            slot="end"
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(publisher, publisher_local as PublisherLocal | null);
            }}
          >
            <IonIcon src={editIcon} slot="icon-only" />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};
