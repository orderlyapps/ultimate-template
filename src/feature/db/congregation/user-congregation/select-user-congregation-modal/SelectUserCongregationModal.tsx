import { SelectModal } from "@input/select/SelectModal";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { isNull, useLiveQuery } from "@tanstack/react-db";
import { useUserCongregation } from "../use-user-congregation/useUserCongregation";

export const SelectUserCongregationModal: React.FC = () => {
  const [congregation, setCongregation] = useUserCongregation();

  const { data } = useLiveQuery((q) =>
    q
      .from({
        c: congregationCollection,
      })
      .where(({ c }) => isNull(c.congregation_id))
  );

  const options = data?.map((congregation) => ({
    value: congregation.id,
    label: congregation.name,
  }));

  return (
    <SelectModal
      options={options ?? []}
      label="Congregation"
      value={congregation?.id}
      onValueChange={(value) =>
        setCongregation(data?.find((c) => c.id === value))
      }
    />
  );
};
