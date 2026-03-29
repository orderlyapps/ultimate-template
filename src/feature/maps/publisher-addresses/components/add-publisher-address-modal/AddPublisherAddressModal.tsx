import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";
import addIcon from "@icons/add.svg";
import { List } from "@ionic-layout/list/List";
import { Space } from "@layout/space/Space";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { PublisherSelect } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/publisher-select/PublisherSelect";
import { LabelInput } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/label-input/LabelInput";
import { SuburbSelect } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/suburb-select/SuburbSelect";
import { StreetSelect } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/street-select/StreetSelect";
import { HouseNumberInput } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/house-number-input/HouseNumberInput";
import { UnitNumberInput } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/unit-number-input/UnitNumberInput";
import { SaveButton } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/components/save-button/SaveButton";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";

export const AddPublisherAddressModal: React.FC = () => {
  const isOpen = useAddPublisherAddressStore(
    (state) => state.isAddAddressModalOpen,
  );
  const closeAddAddressModal = useAddPublisherAddressStore(
    (state) => state.closeAddAddressModal,
  );
  const errorMessage = useAddPublisherAddressStore(
    (state) => state.errorMessage,
  );
  const setErrorMessage = useAddPublisherAddressStore(
    (state) => state.setErrorMessage,
  );
  const openAddAddressModal = useAddPublisherAddressStore(
    (state) => state.openAddAddressModal,
  );
  const suburb = useAddPublisherAddressStore((state) => state.suburb);
  const street = useAddPublisherAddressStore((state) => state.street);
  const houseNumber = useAddPublisherAddressStore((state) => state.houseNumber);
  const selectedPublisherId = usePublisherAddressesStore(
    (state) => state.selectedPublisherId,
  );

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={openAddAddressModal}>
          <IonIcon icon={addIcon} size="large" />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={isOpen} onDidDismiss={closeAddAddressModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Publisher Address</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={closeAddAddressModal} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List inset>
            <PublisherSelect />
            {selectedPublisherId !== null && (
              <>
                <LabelInput />
                <SuburbSelect />
                {suburb !== null && <StreetSelect />}
                {street !== null && <HouseNumberInput />}
                {houseNumber !== null && houseNumber !== "" && (
                  <>
                    <UnitNumberInput />
                    <Space height="2" />
                    <SaveButton />
                  </>
                )}
              </>
            )}
          </List>
        </IonContent>
      </IonModal>
      <IonToast
        isOpen={!!errorMessage}
        message={errorMessage ?? ""}
        duration={3000}
        color="danger"
        position="bottom"
        onDidDismiss={() => setErrorMessage(null)}
      />
    </>
  );
};
