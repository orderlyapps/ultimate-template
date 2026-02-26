import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eq, or, useLiveQuery } from "@tanstack/react-db";
import { formatPublisherName } from "@format/formatPublisherName";
import { useUserPublisher } from "../use-user-publisher/useUserPublisher";
import { TypeaheadPublisherModal } from "./components/typeahead-publisher-modal/TypeaheadPublisherModal";

export const SelectUserPublisherModal: React.FC = () => {
  const [publisher, setPublisher] = useUserPublisher();

  const { data } = useLiveQuery((q) =>
    q
      .from({
        p: publisherCollection,
      })
      .where(({ p }) =>
        or(
          eq(p.type, "regular_pioneer"),
          eq(p.type, "continuous_auxillary_pioneer"),
          eq(p.type, "publisher"),
        ),
      ),
  );

  const options = data?.map((p) => ({
    value: p.id,
    label: formatPublisherName(p, "display last"),
  }));

  return (
    <TypeaheadPublisherModal
      options={options ?? []}
      label="User Details"
      value={publisher?.id}
      onValueChange={(value) => setPublisher(data?.find((p) => p.id === value))}
    />
  );
};
