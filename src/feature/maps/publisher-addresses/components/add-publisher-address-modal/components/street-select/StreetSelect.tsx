import { useAddPublisherAddressStore } from "@feature/maps/publisher-addresses/components/add-publisher-address-modal/store/useAddPublisherAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { AddStreetModal } from "@feature/maps/door-to-door/components/add-address-modal/components/street-select-modal/components/add-street-modal/AddStreetModal";

export const StreetSelect: React.FC = () => {
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const suburb = useAddPublisherAddressStore((state) => state.suburb);
  const street = useAddPublisherAddressStore((state) => state.street);
  const setStreet = useAddPublisherAddressStore((state) => state.setStreet);
  const recentStreetsBySuburb = useAddPublisherAddressStore(
    (state) => state.recentStreetsBySuburb,
  );
  const addRecentStreet = useAddPublisherAddressStore(
    (state) => state.addRecentStreet,
  );

  const { data: streets = [] } = useLiveQuery(
    (q) =>
      suburb?.id
        ? q
            .from({ s: streetCollection })
            .where(({ s }) => eq(s.suburb_id, suburb.id))
            .orderBy(({ s }) => s.name)
        : q.from({ s: streetCollection }).where(() => false),
    [suburb?.id],
  );

  const streetOptions = streets.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const options = [
    {
      value: "add-new",
      label: "＋ Add New Street",
      color: "primary",
      bold: true,
    },
    ...streetOptions,
  ];

  const handleValueChange = (value: string | null) => {
    if (value === "add-new") {
      setIsAddNewModalOpen(true);
      return;
    }

    const selectedStreet = value ? streets.find((s) => s.id === value) : null;
    setStreet(selectedStreet ?? null);
    if (selectedStreet && suburb) {
      addRecentStreet(suburb, {
        value: selectedStreet.id,
        label: selectedStreet.name,
      });
    }
  };

  const recentStreets = suburb?.id
    ? recentStreetsBySuburb[suburb.id] || []
    : [];
  const recentlySelected = [...recentStreets].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return (
    <>
      <SelectModal
        options={options}
        label="Street"
        value={street?.id ?? null}
        placeholder="Select a street"
        modalTitle="Select a street"
        onValueChange={handleValueChange}
        recentlySelected={recentlySelected}
        listHeader="Streets"
        persistantOptions={["add-new"]}
      />
      <AddStreetModal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
      />
    </>
  );
};
