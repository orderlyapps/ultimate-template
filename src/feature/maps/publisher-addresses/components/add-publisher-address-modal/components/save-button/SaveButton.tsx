import { IonButton } from "@ionic/react";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";
import { handleSavePublisherAddress } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/handlers/handleSavePublisherAddress";

export const SaveButton: React.FC = () => {
  const suburb = useAddPublisherAddressStore((state) => state.suburb);
  const street = useAddPublisherAddressStore((state) => state.street);
  const houseNumber = useAddPublisherAddressStore((state) => state.houseNumber);
  const selectedPublisherId = usePublisherAddressesStore(
    (state) => state.selectedPublisherId,
  );

  const canSubmit =
    suburb !== null &&
    street !== null &&
    houseNumber.trim() !== "" &&
    selectedPublisherId !== null;

  return (
    <IonButton
      expand="block"
      disabled={!canSubmit}
      onClick={() => handleSavePublisherAddress()}
    >
      Add Address
    </IonButton>
  );
};
