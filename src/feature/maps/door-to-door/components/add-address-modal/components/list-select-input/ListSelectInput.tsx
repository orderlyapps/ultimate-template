import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { SelectItem } from "@input/select/SelectItem";

export const ListSelectInput: React.FC = () => {
  const listType = useAddAddressStore((state) => state.listType);
  const setListType = useAddAddressStore((state) => state.setListType);

  return (
    <SelectItem
      label="List"
      options={[
        { value: "return", label: "Return" },
        { value: "write", label: "Write" },
      ]}
      value={listType}
      onIonChange={(e) => setListType(e.detail.value)}
      interface="popover"
    />
  );
};
