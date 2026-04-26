import { useAddEditAddressStore } from "../../store/useAddEditAddressStore";
import { TextInput } from "@input/text/TextInput";

export const HouseNumberInput: React.FC = () => {
  const houseNumber = useAddEditAddressStore((state) => state.houseNumber);
  const setHouseNumber = useAddEditAddressStore(
    (state) => state.setHouseNumber
  );

  return (
    <TextInput
      label="House"
      placeholder="e.g. 12 or 12A"
      value={houseNumber}
      onIonInput={(e) => setHouseNumber(e.detail.value ?? "")}
    />
  );
};
