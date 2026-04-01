import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { TextInput } from "@input/text/TextInput";

export const UnitNumberInput: React.FC = () => {
  const unitNumber = usePublisherAddressStore((state) => state.unitNumber);
  const setUnitNumber = usePublisherAddressStore(
    (state) => state.setUnitNumber
  );

  return (
    <TextInput
      label="Unit"
      placeholder="e.g. 1 or A (optional)"
      value={unitNumber}
      onIonInput={(e) => setUnitNumber(e.detail.value ?? "")}
    />
  );
};
