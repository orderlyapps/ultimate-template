import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { TextInput } from "@input/text/TextInput";

export const HouseNumberInput: React.FC = () => {
  const houseNumber = usePublisherAddressStore((state) => state.houseNumber);
  const setHouseNumber = usePublisherAddressStore(
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
