import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { useCreatePublisherAuthUser } from "../use-create-publisher-auth-user/useCreatePublisherAuthUser";

type PublisherSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal for selecting a publisher without an auth account.
 * Shows a searchable list of publishers. Selecting a publisher
 * opens a confirmation alert, then creates a passwordless auth user.
 */
export const PublisherSelectModal: React.FC<PublisherSelectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { createAuthUser } = useCreatePublisherAuthUser();

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const eligible = publishers?.filter((p) => !p.auth_id) ?? [];

  const filteredPublishers = eligible.filter((p) => {
    const name = formatPublisherName(p).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  const handleSelect = (publisherId: string, name: string) => {
    presentAlert({
      header: "Create auth user?",
      message: `This will create a passwordless account for ${name}.`,
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Create",
          handler: async () => {
            try {
              await createAuthUser(publisherId);
              presentToast({
                message: `Auth user created for ${name}`,
                duration: 2000,
                color: "success",
              });
              onClose();
            } catch (err) {
              presentToast({
                message: `Error: ${(err as Error).message}`,
                duration: 4000,
                color: "danger",
              });
            }
          },
        },
      ],
    });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Publisher</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onClose} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search publishers..."
            debounce={200}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List inset>
          {!filteredPublishers.length ? (
            <Item lines="none">
              <Text color="medium">
                {searchQuery
                  ? "No publishers match your search."
                  : "No publishers without an auth account."}
              </Text>
            </Item>
          ) : (
            filteredPublishers.map((p) => (
              <Item
                key={p.id}
                button
                onClick={() => handleSelect(p.id, formatPublisherName(p))}
              >
                <Text>{formatPublisherName(p)}</Text>
              </Item>
            ))
          )}
        </List>
      </IonContent>
    </IonModal>
  );
};
