import { useAddEditAddressStore } from "../../store/useAddEditAddressStore";
import { TextInput } from "@input/text/TextInput";

export const UnitNumberInput: React.FC = () => {
  const unitNumber = useAddEditAddressStore((state) => state.unitNumber);
  const setUnitNumber = useAddEditAddressStore((state) => state.setUnitNumber);

  return (
    <TextInput
      label="Unit"
      placeholder="e.g. 1 or A (optional)"
      value={unitNumber}
      onIonInput={(e) => setUnitNumber(e.detail.value ?? "")}
    />
  );
};
