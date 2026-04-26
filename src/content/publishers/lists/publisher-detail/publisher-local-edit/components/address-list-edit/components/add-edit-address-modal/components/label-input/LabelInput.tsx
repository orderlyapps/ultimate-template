import { useAddEditAddressStore } from "../../store/useAddEditAddressStore";
import { TextInput } from "@input/text/TextInput";

export const LabelInput: React.FC = () => {
  const label = useAddEditAddressStore((state) => state.label);
  const setLabel = useAddEditAddressStore((state) => state.setLabel);

  return (
    <TextInput
      label="Label"
      placeholder="e.g. Home, Work"
      value={label}
      onIonInput={(e) => setLabel(e.detail.value ?? "")}
    />
  );
};
