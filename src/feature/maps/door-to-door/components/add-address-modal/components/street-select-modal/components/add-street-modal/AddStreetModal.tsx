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
} from "@ionic/react";
import { mapMasterCollection } from "@tanstack-db/map_master/mapMasterCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { useAddStreetModalStore } from "./store/useAddStreetModalStore";
import { handleSearch } from "./handlers/handleSearch";
import { ConfirmAlert } from "./components/confirm-alert/ConfirmAlert";
import { ErrorToast } from "./components/error-toast/ErrorToast";
import type { MapboxGeocodingStreetResponse } from "@services/vendor/mapbox/types/MapboxGeocodingStreetResponse";

interface AddStreetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStreetModal: React.FC<AddStreetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const searchQuery = useAddStreetModalStore((state) => state.searchQuery);
  const searchResults = useAddStreetModalStore((state) => state.searchResults);
  const isSearching = useAddStreetModalStore((state) => state.isSearching);
  const setSelectedStreet = useAddStreetModalStore(
    (state) => state.setSelectedStreet,
  );

  const reset = useAddStreetModalStore((state) => state.reset);
  const suburb = useAddAddressStore((state) => state.suburb);

  const { data: mapMaster } = useLiveQuery((q) =>
    q.from({
      m: mapMasterCollection,
    }),
  );

  const handleSelectStreet = (streetResult: MapboxGeocodingStreetResponse) => {
    setSelectedStreet(streetResult);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Street</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleClose} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) =>
              handleSearch(e.detail.value ?? "", suburb, mapMaster)
            }
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
            {searchResults.map((street) => {
              if (street.properties.context.place?.name !== suburb.name)
                return null;

              return (
                <Item
                  key={street.id}
                  onClick={() => handleSelectStreet(street)}
                >
                  <Text>{street.properties.name}</Text>
                </Item>
              );
            })}
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

      <ConfirmAlert suburb={suburb} onClose={handleClose} />
      <ErrorToast />
    </IonModal>
  );
};
