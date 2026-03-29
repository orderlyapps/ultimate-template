import { IonInput, IonItem } from "@ionic/react";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";

export const HouseNumberInput: React.FC = () => {
  const houseNumber = useAddPublisherAddressStore(
    (state) => state.houseNumber,
  );
  const setHouseNumber = useAddPublisherAddressStore(
    (state) => state.setHouseNumber,
  );

  return (
    <IonItem>
      <IonInput
        label="House Number"
        labelPlacement="stacked"
        placeholder="e.g. 123"
        value={houseNumber}
        onIonInput={(e) => setHouseNumber(e.detail.value ?? "")}
      />
    </IonItem>
  );
};
