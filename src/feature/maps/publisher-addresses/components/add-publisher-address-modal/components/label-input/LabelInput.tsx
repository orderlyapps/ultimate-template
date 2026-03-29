import { IonInput, IonItem } from "@ionic/react";
import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";

export const LabelInput: React.FC = () => {
  const label = useAddPublisherAddressStore((state) => state.label);
  const setLabel = useAddPublisherAddressStore((state) => state.setLabel);

  return (
    <IonItem>
      <IonInput
        label="Label"
        labelPlacement="stacked"
        placeholder="e.g. Home, Work"
        value={label}
        onIonInput={(e) => setLabel(e.detail.value ?? "")}
      />
    </IonItem>
  );
};
