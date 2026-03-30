import { IonList, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import { usePublishersQuery } from "@/content/publishers/map/publishers-modal/publishers-list/use-publishers-query";
import { formatPublisherName } from "@format/formatPublisherName";
import { useZoomToPublisher } from "@/content/publishers/map/publishers-modal/publishers-list/use-zoom-to-publisher";

export const PublishersList: React.FC = () => {
  const { data: publishers = [], isLoading } = usePublishersQuery();
  
  const { handlePublisherClick } = useZoomToPublisher();

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
      {publishers.map(({ publisher, publiser_local }) => (
        <IonItem 
          key={publisher.id}
          button
          onClick={() => handlePublisherClick(publiser_local)}
        >
          <IonLabel>{formatPublisherName(publisher)}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
