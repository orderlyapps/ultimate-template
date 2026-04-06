import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";

export function useAddVisitingSpeakerData() {
  const userCongregationId = localStorage.getItem("congregationId");

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      congregationId: c.congregation_id,
      name: c.name,
    })),
  );

  const visitingCongregations = congregations
    .filter((c) => c.congregationId === userCongregationId)
    .map((c) => ({ id: c.id, name: c.name }));

  return {
    congregations: visitingCongregations,
  };
}
