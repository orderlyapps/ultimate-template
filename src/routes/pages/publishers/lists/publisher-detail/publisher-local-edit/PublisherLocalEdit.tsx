import { PublisherLocalEditContent } from "@/content/publishers/lists/publisher-detail/publisher-local-edit/PublisherLocalEditContent";
import { usePublisherById } from "@/content/publishers/lists/publisher-detail/publisher-local-edit/hooks/usePublisherById";
import { usePublisherLocal } from "@/content/publishers/lists/publisher-detail/hooks/usePublisherLocal";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";
import { usePublisherEditStore } from "@/content/publishers/lists/publisher-detail/publisher-local-edit/store/usePublisherEditStore";
import { formatPublisherName } from "@/util/format/formatPublisherName";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Text } from "@ionic-display/text/Text";

export const PublisherEdit: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const history = useHistory();
  const { data: publisherData } = usePublisherById(publisherId);
  const { data: localData, isLoading } = usePublisherLocal(publisherId);
  const publisher = publisherData?.[0];
  const localPublisher = localData?.[0];

  const {
    confidential_id,
    birth_date,
    baptism_date,
    phone,
    address,
    email,
    emergency_contact,
    initializeFromPublisher,
    reset,
  } = usePublisherEditStore();

  useEffect(() => {
    if (localPublisher) {
      initializeFromPublisher({
        confidential_id: localPublisher.confidential_id as string,
        birth_date: localPublisher.birth_date as string | undefined,
        baptism_date: localPublisher.baptism_date as string | undefined,
        phone: localPublisher.phone as typeof phone | undefined,
        address: localPublisher.address as typeof address | undefined,
        email: localPublisher.email as typeof email | undefined,
        emergency_contact: localPublisher.emergency_contact as
          | typeof emergency_contact
          | undefined,
      });
    }
    return () => reset();
  }, [localPublisher, initializeFromPublisher, reset]);

  const handleSave = () => {
    const now = Date.now();
    const isNewRecord = !localPublisher;

    if (isNewRecord) {
      publisherLocalCollection.insert({
        publisher_id: publisherId,
        confidential_id: crypto.randomUUID(),
        birth_date: birth_date || undefined,
        baptism_date: baptism_date || undefined,
        phone: phone.length > 0 ? phone : undefined,
        address: address.length > 0 ? address : undefined,
        email: email.length > 0 ? email : undefined,
        emergency_contact:
          emergency_contact.length > 0 ? emergency_contact : undefined,
        version: {
          created_by: "user",
          updated_by: "user",
          created_at: now,
          updated_at: now,
        },
      });
    } else {
      publisherLocalCollection.update(localPublisher.publisher_id, (draft) => {
        draft.confidential_id = confidential_id;
        draft.birth_date = birth_date || undefined;
        draft.baptism_date = baptism_date || undefined;
        draft.phone = phone.length > 0 ? phone : undefined;
        draft.address = address.length > 0 ? address : undefined;
        draft.email = email.length > 0 ? email : undefined;
        draft.emergency_contact =
          emergency_contact.length > 0 ? emergency_contact : undefined;
        draft.version.updated_at = now;
      });
    }
    history.goBack();
  };

  const publisherName = formatPublisherName(
    publisher,
    "display last",
    "Edit Publisher",
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>{publisherName}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave}>
              <Text bold>Save</Text>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <PublisherLocalEditContent isLoading={isLoading} />
      </IonContent>
    </IonPage>
  );
};
