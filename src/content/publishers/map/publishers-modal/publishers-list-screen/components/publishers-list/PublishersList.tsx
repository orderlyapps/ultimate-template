import { IonList, IonItem, IonLabel, IonSpinner, IonIcon, IonButton } from "@ionic/react";
import { useState } from "react";
import { usePublishersQuery } from "./use-publishers-query";
import { formatPublisherName } from "@format/formatPublisherName";
import { Text } from "@ionic-display/text/Text";
import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { useZoomToPublisher } from "./use-zoom-to-publisher";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import editIcon from "@icons/edit.svg";
import { useInitializeAddressForm } from "./hooks/useInitializeAddressForm";

export const PublishersList: React.FC = () => {
  const { data: publishers = [], isLoading } = usePublishersQuery();
  const { handlePublisherClick } = useZoomToPublisher();
  const resetForm = usePublisherAddressStore((state) => state.resetForm);
  const [initializingPublisher, setInitializingPublisher] = useState<{
    publisher: Publisher;
    publisherLocal: PublisherLocal | null;
  } | null>(null);

  // Initialize form when a publisher is selected for editing
  useInitializeAddressForm({
    publisher: initializingPublisher?.publisher ?? null,
    publisherLocal: initializingPublisher?.publisherLocal ?? null,
    shouldInitialize: initializingPublisher !== null,
    onInitialized: () => setInitializingPublisher(null),
  });

  const handleEditAddress = (
    publisher: Publisher,
    publisherLocal: PublisherLocal | null
  ) => {
    // Reset any existing form state first
    resetForm();
    // Set the initializing state which will trigger the hook
    setInitializingPublisher({ publisher, publisherLocal });
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
