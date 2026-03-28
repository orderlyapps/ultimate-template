import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import editIcon from "@icons/edit.svg";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { usePublisherLocal } from "@/content/publishers/all/publisher-detail/hooks/usePublisherLocal";

export const ConfidentialData: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const history = useHistory();
  const { data, isLoading } = usePublisherLocal(publisherId);

  if (isLoading) return <p>Loading...</p>;

  const publisher = data?.[0] as PublisherLocal | undefined;

  if (!publisher) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <p>No local data found for this publisher.</p>
          </IonLabel>
        </IonItem>
        <IonButton
          expand="block"
          onClick={() => history.push(`/publishers/all/${publisherId}/edit`)}
        >
          <IonIcon src={editIcon} slot="start" />
          Add Local Data
        </IonButton>
      </IonList>
    );
  }

  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <h2>Publisher ID</h2>
          <p>{publisher.publisher_id}</p>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <h2>Confidential ID</h2>
          <p>{publisher.confidential_id}</p>
        </IonLabel>
      </IonItem>
      {publisher.birth_date && (
        <IonItem>
          <IonLabel>
            <h2>Birth Date</h2>
            <p>{publisher.birth_date}</p>
          </IonLabel>
        </IonItem>
      )}
      {publisher.baptism_date && (
        <IonItem>
          <IonLabel>
            <h2>Baptism Date</h2>
            <p>{publisher.baptism_date}</p>
          </IonLabel>
        </IonItem>
      )}
      {publisher.phone && publisher.phone.length > 0 && (
        <IonItem>
          <IonLabel>
            <h2>Phone</h2>
            {publisher.phone.map((p) => (
              <p key={p.id}>
                {p.label}: {p.number}
              </p>
            ))}
          </IonLabel>
        </IonItem>
      )}
      {publisher.email && publisher.email.length > 0 && (
        <IonItem>
          <IonLabel>
            <h2>Email</h2>
            {publisher.email.map((e) => (
              <p key={e.id}>
                {e.label}: {e.address}
              </p>
            ))}
          </IonLabel>
        </IonItem>
      )}
      {publisher.address && publisher.address.length > 0 && (
        <IonItem>
          <IonLabel>
            <h2>Address</h2>
            {publisher.address.map((a) => (
              <p key={a.id}>
                {a.label}: {a.unit_number} {a.house_number} {a.street},{" "}
                {a.suburb}
              </p>
            ))}
          </IonLabel>
        </IonItem>
      )}
      <IonButton
        expand="block"
        onClick={() => history.push(`/publishers/all/${publisherId}/edit`)}
      >
        <IonIcon src={editIcon} slot="start" />
        Edit Publisher
      </IonButton>
    </IonList>
  );
};
