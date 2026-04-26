import { useAddEditAddressStore } from "../../store/useAddEditAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { useLiveQuery } from "@tanstack/react-db";

export const SuburbSelect: React.FC = () => {
  const suburb = useAddEditAddressStore((state) => state.suburb);
  const setSuburb = useAddEditAddressStore((state) => state.setSuburb);

  const { data: suburbs } = useLiveQuery((q) =>
    q
      .from({
        s: suburbCollection,
      })
      .orderBy(({ s }) => s.name)
  );

  const suburbOptions = suburbs.map((suburb) => ({
    value: suburb.id,
    label: suburb.name,
  }));

  const handleValueChange = (value: string | null) => {
    const selectedSuburb = value ? suburbs?.find((s) => s.id === value) : null;
    setSuburb(selectedSuburb ?? null);
  };

  return (
    <SelectModal
      options={suburbOptions}
      label="Suburb"
      value={suburb?.id ?? null}
      placeholder="Select a suburb"
      modalTitle="Select a suburb"
      onValueChange={handleValueChange}
      listHeader="Suburbs"
    />
  );
};
