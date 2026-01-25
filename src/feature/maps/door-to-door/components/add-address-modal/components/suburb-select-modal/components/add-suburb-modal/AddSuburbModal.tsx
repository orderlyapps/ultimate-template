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
import { useAddSuburbModalStore } from "./store/useAddSuburbModalStore";
import { handleSearch } from "./handlers/handleSearch";
import { ConfirmAlert } from "./components/confirm-alert/ConfirmAlert";
import { ErrorToast } from "./components/error-toast/ErrorToast";
import type { MapboxGeocodingFeature } from "@services/vendor/mapbox/types/MapboxGeocodingResponse";

interface AddSuburbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSuburbModal: React.FC<AddSuburbModalProps> = ({
  isOpen,
  onClose,
}) => {
  const searchQuery = useAddSuburbModalStore((state) => state.searchQuery);
  const searchResults = useAddSuburbModalStore((state) => state.searchResults);
  const isSearching = useAddSuburbModalStore((state) => state.isSearching);
  const setSelectedSuburb = useAddSuburbModalStore(
    (state) => state.setSelectedSuburb,
  );
  const reset = useAddSuburbModalStore((state) => state.reset);

  const { data: mapMaster } = useLiveQuery((q) =>
    q.from({
      m: mapMasterCollection,
    }),
  );

  const handleSelectSuburb = (suburbResult: MapboxGeocodingFeature) => {
    setSelectedSuburb(suburbResult);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Suburb</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleClose} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => handleSearch(e.detail.value ?? "", mapMaster)}
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
              <Item key={suburb.id} onClick={() => handleSelectSuburb(suburb)}>
                <Text>{suburb.properties.name}</Text>
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

      <ConfirmAlert onClose={handleClose} />
      <ErrorToast />
    </IonModal>
  );
};
