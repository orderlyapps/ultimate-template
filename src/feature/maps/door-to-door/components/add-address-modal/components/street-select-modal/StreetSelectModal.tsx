import { useAddAddressStore } from "@feature/maps/door-to-door/components/add-address-modal/store/useAddAddressStore";
import { SelectModal } from "@input/select/SelectModal";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";

export const StreetSelectModal: React.FC = () => {
  const streetId = useAddAddressStore((state) => state.streetId);
  const setStreetId = useAddAddressStore((state) => state.setStreetId);
  const suburbId = useAddAddressStore((state) => state.suburbId);
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
        .where(({ s }) => eq(s.suburb_id, suburbId))
        .orderBy(({ s }) => s.name);
    },
    [suburbId],
  );

  const options = (streets ?? []).map((street) => ({
    value: street.id,
    label: street.name,
  }));

  const recentStreets = suburbId ? recentStreetsBySuburb[suburbId] || [] : [];

  const handleValueChange = (value: string | null) => {
    setStreetId(value);
    if (value && suburbId) {
      const selectedStreet = streets?.find((s) => s.id === value);
      if (selectedStreet) {
        addRecentStreet(suburbId, {
          value: selectedStreet.id,
          label: selectedStreet.name,
        });
      }
    }
  };

  const recentlySelected = recentStreets
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((street) => street);

  return (
    <SelectModal
      options={options}
      label="Street"
      value={streetId}
      placeholder="Select a street"
      modalTitle="Select a street"
      onValueChange={handleValueChange}
      recentlySelected={recentlySelected}
      listHeader="Streets"
    />
  );
};
