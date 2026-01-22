import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { TextInput } from "@input/text/TextInput";

export const HouseNumberInput: React.FC = () => {
  const houseNumber = useAddAddressStore((state) => state.houseNumber);
  const setHouseNumber = useAddAddressStore((state) => state.setHouseNumber);

  return (
    <TextInput
      label="House Number"
      placeholder="Enter house number"
      value={houseNumber}
      onIonInput={(e) => setHouseNumber(e.detail.value ?? "")}
    />
  );
};
