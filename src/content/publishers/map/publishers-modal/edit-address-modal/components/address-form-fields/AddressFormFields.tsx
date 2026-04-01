import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { SuburbSelect } from "./components/suburb-select/SuburbSelect";
import { StreetSelect } from "./components/street-select/StreetSelect";
import { HouseNumberInput } from "./components/house-number-input/HouseNumberInput";
import { UnitNumberInput } from "./components/unit-number-input/UnitNumberInput";

export const AddressFormFields: React.FC = () => {
  const suburb = usePublisherAddressStore((state) => state.suburb);
  const street = usePublisherAddressStore((state) => state.street);
  const houseNumber = usePublisherAddressStore((state) => state.houseNumber);

  return (
    <>
      <SuburbSelect />
      {suburb !== null && <StreetSelect />}
      {street !== null && <HouseNumberInput />}
      {houseNumber !== "" && <UnitNumberInput />}
    </>
  );
};
