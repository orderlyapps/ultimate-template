import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { AddStreetModal } from "./components/add-street-modal/AddStreetModal";

export const StreetSelectModal: React.FC = () => {
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);
  const street = useAddAddressStore((state) => state.street);
  const setStreet = useAddAddressStore((state) => state.setStreet);
  const suburb = useAddAddressStore((state) => state.suburb);
  const recentStreetsBySuburb = useAddAddressStore(
    (state) => state.recentStreetsBySuburb,
  );
  const addRecentStreet = useAddAddressStore((state) => state.addRecentStreet);

  const { data: streets } = useLiveQuery(
    (q) => {
      return q
        .from({
          s: streetCollection,
        })
        .where(({ s }) => eq(s.suburb_id, suburb?.id))
        .orderBy(({ s }) => s.name);
    },
    [suburb?.id],
  );

  const streetOptions = (streets ?? []).map((street) => ({
    value: street.id,
    label: street.name,
  }));

  const options = [
    { value: "add-new", label: "+ Add New Street" },
    ...streetOptions,
  ];

  const recentStreets = suburb ? recentStreetsBySuburb[suburb.id] || [] : [];

  const handleValueChange = (value: string | null) => {
    if (value === "add-new") {
      setIsAddNewModalOpen(true);
      return;
    }

    const selectedStreet = value ? streets?.find((s) => s.id === value) : null;
    setStreet(selectedStreet ?? null);
    if (selectedStreet && suburb) {
      addRecentStreet(suburb, {
        value: selectedStreet.id,
        label: selectedStreet.name,
      });
    }
  };

  const recentlySelected = [...recentStreets]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((street) => street);

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
      />

      <AddStreetModal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
      />
    </>
  );
};
