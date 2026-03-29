import { IonInput, IonItem } from "@ionic/react";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";

export const UnitNumberInput: React.FC = () => {
  const unitNumber = useAddPublisherAddressStore((state) => state.unitNumber);
  const setUnitNumber = useAddPublisherAddressStore(
    (state) => state.setUnitNumber,
  );

  return (
    <IonItem>
      <IonInput
        label="Unit Number (optional)"
        labelPlacement="stacked"
        placeholder="e.g. 1A"
        value={unitNumber}
        onIonInput={(e) => setUnitNumber(e.detail.value ?? "")}
      />
    </IonItem>
  );
};
