import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { useLiveQuery } from "@tanstack/react-db";

export const SuburbSelectModal: React.FC = () => {
  const suburbId = useAddAddressStore((state) => state.suburbId);
  const setSuburbId = useAddAddressStore((state) => state.setSuburbId);
  const recentSuburbs = useAddAddressStore((state) => state.recentSuburbs);
  const addRecentSuburb = useAddAddressStore((state) => state.addRecentSuburb);

  const { data: suburbs } = useLiveQuery((q) =>
    q
      .from({
        s: suburbCollection,
      })
      .orderBy(({ s }) => s.name),
  );

  const options = suburbs.map((suburb) => ({
    value: suburb.id,
    label: suburb.name,
  }));

  const handleValueChange = (value: string | null) => {
    setSuburbId(value);
    if (value) {
      const selectedSuburb = suburbs?.find((s) => s.id === value);
      if (selectedSuburb) {
        addRecentSuburb({
          value: selectedSuburb.id,
          label: selectedSuburb.name,
        });
      }
    }
  };

  const recentlySelected = recentSuburbs
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((suburb) => suburb);

  return (
    <SelectModal
      options={options}
      label="Suburb"
      value={suburbId}
      placeholder="Select a suburb"
      modalTitle="Select a suburb"
      onValueChange={handleValueChange}
      recentlySelected={recentlySelected}
      listHeader="Suburbs"
    />
  );
};
