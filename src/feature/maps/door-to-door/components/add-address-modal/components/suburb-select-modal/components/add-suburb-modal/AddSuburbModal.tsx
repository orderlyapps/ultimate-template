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
  getSuburbs,
  type SuburbSearchResult,
} from "@services/vendor/mapbox/helper/getSuburbs";
import { mapMasterCollection } from "@tanstack-db/map_master/mapMasterCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { getBboxFromBoundary } from "@feature/maps/door-to-door/components/add-address-modal/helper/getBboxFromBoundary";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

interface AddSuburbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSuburbModal: React.FC<AddSuburbModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SuburbSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuburb, setSelectedSuburb] =
    useState<SuburbSearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setSuburb = useAddAddressStore((state) => state.setSuburb);
  const addRecentSuburb = useAddAddressStore((state) => state.addRecentSuburb);

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

    setIsSearching(true);
    try {
      const bbox = getBboxFromBoundary(mapMaster?.[0]?.boundary);
      const results = await getSuburbs(query, bbox);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching suburbs:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSuburb = (suburbResult: SuburbSearchResult) => {
    setSelectedSuburb(suburbResult);
  };

  const handleConfirmAddSuburb = async () => {
    if (!selectedSuburb) return;

    try {
      const congregationId = getUserCongregation()?.id;
      if (!congregationId) {
        throw new Error("No congregation selected");
      }

      const newSuburb = {
        id: crypto.randomUUID(),
        congregation_id: congregationId,
        name: selectedSuburb.name,
        bbox: selectedSuburb.bbox,
      };

      const tx = suburbCollection.insert(newSuburb);

      await tx.isPersisted.promise;

      setSuburb(newSuburb);
      addRecentSuburb({
        value: newSuburb.id,
        label: newSuburb.name,
      });

      setSelectedSuburb(null);
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("suburb_congregation_id_name_key")) {
        console.log("This suburb is has already been added");
        setErrorMessage(`This suburb is has already been added`);
      } else {
        setErrorMessage(errorMessage);
        console.error(`Failed to add todo: ${error}`);
      }

      setSelectedSuburb(null);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Suburb</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onClose} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => handleSearch(e.detail.value ?? "")}
            placeholder="Search for a suburb..."
            debounce={500}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isSearching && (
          <div className="ion-padding ion-text-center">
            <IonSpinner />
          </div>
        )}
        {!isSearching && searchResults.length > 0 && (
          <IonList>
            {searchResults.map((suburb) => (
              <Item
                key={suburb.id}
                button
                onClick={() => handleSelectSuburb(suburb)}
                detail={false}
              >
                <div>
                  <Text>{suburb.name}</Text>
                  <Text color="medium" style={{ fontSize: "0.875rem" }}>
                    {suburb.place_name}
                  </Text>
                </div>
              </Item>
            ))}
          </IonList>
        )}
        {!isSearching && searchQuery && searchResults.length === 0 && (
          <div className="ion-padding ion-text-center">
            <Text color="medium">No suburbs found</Text>
          </div>
        )}
        {!searchQuery && (
          <div className="ion-padding ion-text-center">
            <Text color="medium">Search for a suburb to add</Text>
          </div>
        )}
      </IonContent>

      <IonAlert
        isOpen={!!selectedSuburb}
        header="Add New Suburb"
        message={
          selectedSuburb ? `Add "${selectedSuburb.name}" to the database?` : ""
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => setSelectedSuburb(null),
          },
          {
            text: "Add",
            role: "confirm",
            handler: handleConfirmAddSuburb,
          },
        ]}
        onDidDismiss={() => setSelectedSuburb(null)}
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
