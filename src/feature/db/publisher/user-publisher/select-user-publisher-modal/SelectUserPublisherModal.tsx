import { SelectModal } from "@input/select/SelectModal";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eq, not, or, useLiveQuery } from "@tanstack/react-db";
import { formatPublisherName } from "@format/formatPublisherName";
import { useUserPublisher } from "../use-user-publisher/useUserPublisher";

export const SelectUserPublisherModal: React.FC = () => {
  const [publisher, setPublisher] = useUserPublisher();

  const { data } = useLiveQuery((q) =>
    q
      .from({
        p: publisherCollection,
      })
      .where(({ p }) =>
        or(not(eq(p.type, "speaker")), eq(p.type, "associate")),
      ),
  );

  const options = data?.map((p) => ({
    value: p.id,
    label: formatPublisherName(p, "display last"),
  }));

  return (
    <SelectModal
      options={options ?? []}
      label="Publisher"
      value={publisher?.id}
      onValueChange={(value) => setPublisher(data?.find((p) => p.id === value))}
    />
  );
};
