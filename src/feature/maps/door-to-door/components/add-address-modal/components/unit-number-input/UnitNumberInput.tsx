import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { TextInput } from "@input/text/TextInput";

export const UnitNumberInput: React.FC = () => {
  const unitNumber = useAddAddressStore((state) => state.unitNumber);
  const setUnitNumber = useAddAddressStore((state) => state.setUnitNumber);

  return (
    <TextInput
      label="Unit"
      placeholder="Optional (e.g. 2, 3B)"
      value={unitNumber}
      onIonInput={(e) => setUnitNumber(e.detail.value ?? "")}
    />
  );
};
