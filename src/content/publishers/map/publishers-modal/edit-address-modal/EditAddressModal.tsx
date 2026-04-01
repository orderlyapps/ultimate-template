import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from "@ionic/react";
import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { List } from "@ionic-layout/list/List";
import { AddressFormFields } from "./components/address-form-fields/AddressFormFields";
import { SaveAddressButton } from "./components/save-address-button/SaveAddressButton";

export const EditAddressModal: React.FC = () => {
  const selectedPublisher = usePublisherAddressStore(
    (state) => state.selectedPublisher
  );
  const existingAddress = usePublisherAddressStore(
    (state) => state.existingAddress
  );
  const resetForm = usePublisherAddressStore((state) => state.resetForm);

  const isOpen = selectedPublisher !== null;
  const title = existingAddress ? "Edit Address" : "Add Address";

  return (
    <IonModal isOpen={isOpen} onDidDismiss={resetForm}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={resetForm} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <List inset>
          <AddressFormFields />
          <SaveAddressButton />
        </List>
      </IonContent>
    </IonModal>
  );
};
