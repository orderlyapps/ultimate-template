import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";
import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { AddSuburbModal } from "@feature/maps/door-to-door/components/add-address-modal/components/suburb-select-modal/components/add-suburb-modal/AddSuburbModal";

export const SuburbSelect: React.FC = () => {
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const suburb = useAddPublisherAddressStore((state) => state.suburb);
  const setSuburb = useAddPublisherAddressStore((state) => state.setSuburb);
  const recentSuburbs = useAddPublisherAddressStore(
    (state) => state.recentSuburbs,
  );
  const addRecentSuburb = useAddPublisherAddressStore(
    (state) => state.addRecentSuburb,
  );

  const { data: suburbs = [] } = useLiveQuery((q) =>
    q.from({ s: suburbCollection }).orderBy(({ s }) => s.name),
  );

  const suburbOptions = suburbs.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const options = [
    {
      value: "add-new",
      label: "＋ Add New Suburb",
      color: "primary",
      bold: true,
    },
    ...suburbOptions,
  ];

  const setDoorToDoorSuburb = useAddAddressStore((state) => state.setSuburb);

  const handleValueChange = (value: string | null) => {
    if (value === "add-new") {
      setIsAddNewModalOpen(true);
      return;
    }

    const selectedSuburb = value ? suburbs.find((s) => s.id === value) : null;
    setSuburb(selectedSuburb ?? null);
    setDoorToDoorSuburb(selectedSuburb ?? null);
    if (selectedSuburb) {
      addRecentSuburb({
        value: selectedSuburb.id,
        label: selectedSuburb.name,
      });
    }
  };

  const recentlySelected = [...recentSuburbs].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return (
    <>
      <SelectModal
        options={options}
        label="Suburb"
        value={suburb?.id ?? null}
        placeholder="Select a suburb"
        modalTitle="Select a suburb"
        onValueChange={handleValueChange}
        recentlySelected={recentlySelected}
        listHeader="Suburbs"
        persistantOptions={["add-new"]}
      />
      <AddSuburbModal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
      />
    </>
  );
};
