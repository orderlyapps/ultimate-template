import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { usePublisherLocal } from "../hooks/usePublisherLocal";
import { usePublisherEditStore } from "./store/usePublisherEditStore";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";

export const PublisherLocalEditContent: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const history = useHistory();
  const { data, isLoading } = usePublisherLocal(publisherId);

  const {
    confidential_id,
    birth_date,
    baptism_date,
    setConfidentialId,
    setBirthDate,
    setBaptismDate,
    initializeFromPublisher,
    reset,
  } = usePublisherEditStore();

  const publisher = data?.[0];

  useEffect(() => {
    if (publisher) {
      initializeFromPublisher({
        confidential_id: publisher.confidential_id as string,
        birth_date: publisher.birth_date as string | undefined,
        baptism_date: publisher.baptism_date as string | undefined,
      });
    }
    return () => reset();
  }, [publisher, initializeFromPublisher, reset]);

  if (isLoading) return <p>Loading...</p>;

  const isNewRecord = !publisher;

  const handleSave = () => {
    const now = Date.now();

    if (isNewRecord) {
      publisherLocalCollection.insert({
        publisher_id: publisherId!,
        confidential_id: crypto.randomUUID(),
        birth_date: birth_date || undefined,
        baptism_date: baptism_date || undefined,
        version: {
          created_by: "user",
          updated_by: "user",
          created_at: now,
          updated_at: now,
        },
      });
    } else {
      publisherLocalCollection.update(publisher.publisher_id, (draft) => {
        draft.confidential_id = confidential_id;
        draft.birth_date = birth_date || undefined;
        draft.baptism_date = baptism_date || undefined;
        draft.version.updated_at = now;
      });
    }
    history.goBack();
  };

  return (
    <IonList>
      <IonItem>
        <IonInput
          label="Confidential ID"
          labelPlacement="stacked"
          value={confidential_id}
          onIonInput={(e) => setConfidentialId(e.detail.value ?? "")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Birth Date"
          labelPlacement="stacked"
          type="date"
          value={birth_date}
          onIonInput={(e) => setBirthDate(e.detail.value ?? "")}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Baptism Date"
          labelPlacement="stacked"
          type="date"
          value={baptism_date}
          onIonInput={(e) => setBaptismDate(e.detail.value ?? "")}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
        Save
      </IonButton>
    </IonList>
  );
};
