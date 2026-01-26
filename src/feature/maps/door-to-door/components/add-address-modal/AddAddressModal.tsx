import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import addIcon from "@icons/add.svg";
import { SuburbSelectModal } from "@feature/maps/door-to-door/components/add-address-modal/components/suburb-select-modal/SuburbSelectModal";
import { StreetSelectModal } from "@feature/maps/door-to-door/components/add-address-modal/components/street-select-modal/StreetSelectModal";
import { List } from "@ionic-layout/list/List";
import { HouseNumberInput } from "@feature/maps/door-to-door/components/add-address-modal/components/house-number-input/HouseNumberInput";
import { UnitNumberInput } from "@feature/maps/door-to-door/components/add-address-modal/components/unit-number-input/UnitNumberInput";
import { ListSelectInput } from "@feature/maps/door-to-door/components/add-address-modal/components/list-select-input/ListSelectInput";
import { SaveAddressButton } from "@feature/maps/door-to-door/components/add-address-modal/components/save-address-button/SaveAddressButton";

export const AddAddressModal: React.FC = () => {
  const isOpen = useAddAddressStore((state) => state.isAddAddressModalOpen);
  const closeAddAddressModal = useAddAddressStore(
    (state) => state.closeAddAddressModal,
  );

  const openAddAddressModal = useAddAddressStore(
    (state) => state.openAddAddressModal,
  );

  const suburb = useAddAddressStore((state) => state.suburb);
  const street = useAddAddressStore((state) => state.street);
  const houseNumber = useAddAddressStore((state) => state.houseNumber);

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
            <IonTitle>Add Address</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeAddAddressModal}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List inset>
            <SuburbSelectModal />
            {suburb !== null && <StreetSelectModal />}
            {street !== null && <HouseNumberInput />}
            {houseNumber !== null && houseNumber !== "" && (
              <>
                <UnitNumberInput />
                <ListSelectInput />
              </>
            )}
          </List>
          <SaveAddressButton onSuccess={closeAddAddressModal} />
        </IonContent>
      </IonModal>
    </>
  );
};
