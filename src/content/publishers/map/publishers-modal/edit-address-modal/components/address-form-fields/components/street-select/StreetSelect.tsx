import { usePublisherAddressStore } from "@/content/publishers/map/publishers-modal/store/use-publisher-address-store";
import { SelectModal } from "@input/select/SelectModal";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";

export const StreetSelect: React.FC = () => {
  const street = usePublisherAddressStore((state) => state.street);
  const setStreet = usePublisherAddressStore((state) => state.setStreet);
  const suburb = usePublisherAddressStore((state) => state.suburb);

  const { data: streets } = useLiveQuery(
    (q) => {
      return q
        .from({
          s: streetCollection,
        })
        .where(({ s }) => eq(s.suburb_id, suburb?.id))
        .orderBy(({ s }) => s.name);
    },
    [suburb?.id]
  );

  const streetOptions = (streets ?? []).map((street) => ({
    value: street.id,
    label: street.name,
  }));

  const handleValueChange = (value: string | null) => {
    const selectedStreet = value ? streets?.find((s) => s.id === value) : null;
    setStreet(selectedStreet ?? null);
  };

  return (
    <SelectModal
      options={streetOptions}
      label="Street"
      value={street?.id ?? null}
      placeholder="Select a street"
      modalTitle="Select a street"
      onValueChange={handleValueChange}
      listHeader="Streets"
    />
  );
};
