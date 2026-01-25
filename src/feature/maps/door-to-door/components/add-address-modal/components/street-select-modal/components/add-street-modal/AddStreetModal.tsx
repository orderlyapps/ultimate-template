import { CloseButton } from "@input/button/close-button/CloseButton";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonList,
  IonSpinner,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import {
  searchStreets,
  type StreetSearchResult,
} from "@services/vendor/mapbox/helper/getStreets";
import { mapMasterCollection } from "@tanstack-db/map_master/mapMasterCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { getBboxFromBoundary } from "@feature/maps/door-to-door/components/add-address-modal/helper/getBboxFromBoundary";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

interface AddStreetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStreetModal: React.FC<AddStreetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StreetSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStreet, setSelectedStreet] =
    useState<StreetSearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const suburb = useAddAddressStore((state) => state.suburb);
  const setStreet = useAddAddressStore((state) => state.setStreet);
  const addRecentStreet = useAddAddressStore((state) => state.addRecentStreet);

  const { data: mapMaster } = useLiveQuery((q) =>
    q.from({
      m: mapMasterCollection,
    }),
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const bbox =
      (suburb?.bbox as [number, number, number, number] | undefined) ??
      getBboxFromBoundary(mapMaster?.[0]?.boundary);
    if (!bbox) {
      console.error("No bbox available for street search");
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchStreets(query, bbox);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching streets:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectStreet = (streetResult: StreetSearchResult) => {
    if (!suburb) {
      setErrorMessage("Please select a suburb first");
      return;
    }
    setSelectedStreet(streetResult);
  };

  const handleConfirmAddStreet = async () => {
    if (!selectedStreet || !suburb) return;

    try {
      const congregationId = getUserCongregation()?.id;
      if (!congregationId) {
        throw new Error("No congregation selected");
      }

      const newStreet = {
        id: crypto.randomUUID(),
        congregation_id: congregationId,
        suburb_id: suburb.id,
        name: selectedStreet.name,
        coordinates: selectedStreet.coordinates,
      };

      const tx = streetCollection.insert(newStreet);

      await tx.isPersisted.promise;

      setStreet(newStreet);
      addRecentStreet(suburb, {
        value: newStreet.id,
        label: newStreet.name,
      });

      setSelectedStreet(null);
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("street_congregation_id_name_suburb_id_key")) {
        console.log("This street has already been added");
        setErrorMessage(`This street has already been added`);
      } else {
        setErrorMessage(errorMessage);
        console.error(`Failed to add street: ${error}`);
      }

      setSelectedStreet(null);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Street</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onClose} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => handleSearch(e.detail.value ?? "")}
            placeholder="Search for a street..."
            debounce={500}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!suburb && (
          <div className="ion-padding ion-text-center">
            <Text color="medium">Please select a suburb first</Text>
          </div>
        )}
        {suburb && isSearching && (
          <div className="ion-padding ion-text-center">
            <IonSpinner />
          </div>
        )}
        {suburb && !isSearching && searchResults.length > 0 && (
          <IonList>
            {searchResults.map((street) => (
              <Item
                key={street.id}
                button
                onClick={() => handleSelectStreet(street)}
                detail={false}
              >
                <div>
                  <Text>{street.name}</Text>
                  <Text color="medium" style={{ fontSize: "0.875rem" }}>
                    {street.place_name}
                  </Text>
                </div>
              </Item>
            ))}
          </IonList>
        )}
        {suburb &&
          !isSearching &&
          searchQuery &&
          searchResults.length === 0 && (
            <div className="ion-padding ion-text-center">
              <Text color="medium">No streets found</Text>
            </div>
          )}
        {suburb && !searchQuery && (
          <div className="ion-padding ion-text-center">
            <Text color="medium">Search for a street to add</Text>
          </div>
        )}
      </IonContent>

      <IonAlert
        isOpen={!!selectedStreet}
        header="Add New Street"
        message={
          selectedStreet && suburb
            ? `Add "${selectedStreet.name}" to ${suburb.name}?`
            : ""
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setSelectedStreet(null),
          },
          {
            text: "Add",
            role: "confirm",
            handler: handleConfirmAddStreet,
          },
        ]}
        onDidDismiss={() => setSelectedStreet(null)}
      />

      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        position="top"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </IonModal>
  );
};
