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
  IonLabel,
} from "@ionic/react";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { useAddStreetModalStore } from "./store/useAddStreetModalStore";
import { handleSearch } from "./handlers/handleSearch";
import { ConfirmAlert } from "./components/confirm-alert/ConfirmAlert";
import { ErrorToast } from "./components/error-toast/ErrorToast";
import type { MapboxGeocodingFeature } from "@services/vendor/mapbox/types/MapboxGeocodingResponse";
import { Space } from "@layout/space/Space";

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

  const handleSelectStreet = (streetResult: MapboxGeocodingFeature) => {
    setSelectedStreet(streetResult);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const unmatched = searchResults.filter((street) => {
    return street.properties.context.place?.name !== suburb?.name;
  });

  console.log(searchResults);

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
            onIonInput={(e) => handleSearch(e.detail.value ?? "", suburb)}
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
            <Space height="2" />
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
              <Text color="medium">No matches found</Text>
            </div>
          )}

        {suburb && !isSearching && unmatched.length > 0 && (
          <IonList>
            <Space height="2" />

            <Item lines="none">
              <Text color="medium">If you are looking for...</Text>
            </Item>

            {unmatched.map((street) => {
              return (
                <Item
                  key={street.id}
                  className="ion-text-center ion-no-margin ion-no-padding"
                  lines="none"
                >
                  <IonLabel>
                    <Text>{street.properties.name}, </Text>
                    <Text>{street.properties.context.place?.name}</Text>
                  </IonLabel>
                </Item>
              );
            })}

            <Item lines="none">
              <Text color="medium" slot="end">
                try selecting another suburb
              </Text>
            </Item>
          </IonList>
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
