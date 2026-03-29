import { SelectModal } from "@input/select/SelectModal";
import { publisherLocalCollection } from "@state/tanstack/db/publisher-local/publisherLocalCollection";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { useLiveQuery } from "@tanstack/react-db";
import { usePublisherAddressesStore } from "@/content/publishers/addresses/store/usePublisherAddressesStore";
import { formatPublisherName } from "@format/formatPublisherName";

export const PublisherSelect: React.FC = () => {
  const selectedPublisherId = usePublisherAddressesStore(
    (state) => state.selectedPublisherId,
  );
  const setSelectedPublisherId = usePublisherAddressesStore(
    (state) => state.setSelectedPublisherId,
  );

  const { data: publishersLocal = [] } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).select(({ p }) => ({
      publisher_id: p.publisher_id,
    })),
  );

  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      display_name: p.display_name,
    })),
  );

  const options = publishersLocal.map((pl) => {
    const publisher = publishers.find((p) => p.id === pl.publisher_id);
    const name = formatPublisherName(publisher);

    return {
      value: pl.publisher_id,
      label: name,
    };
  });

  const handleValueChange = (value: string | null) => {
    setSelectedPublisherId(value);
  };

  return (
    <SelectModal
      options={options}
      label="Publisher"
      value={selectedPublisherId}
      placeholder="Select a publisher"
      modalTitle="Select a publisher"
      onValueChange={handleValueChange}
      listHeader="Publishers"
    />
  );
};
