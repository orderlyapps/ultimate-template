import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";

export function useEditSpeakerData(speakerId: string) {
  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      congregation_id: p.congregation_id,
    })),
  );

  const publisher = publishers.find((p) => p.id === speakerId);

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      name: c.name,
    })),
  );

  const { data: speakerOutlines = [] } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }).select(({ so }) => ({
      speakerId: so.speaker_id,
      outlineId: so.outline_id,
    })),
  );

  const currentOutlineIds = speakerOutlines
    .filter((so) => so.speakerId === speakerId)
    .map((so) => so.outlineId);

  const userCongregationId = localStorage.getItem("congregationId");
  const isLocal = publisher?.congregation_id === userCongregationId;

  const congregationName =
    congregations.find((c) => c.id === publisher?.congregation_id)?.name ??
    "Unknown";

  return {
    publisher,
    congregationName,
    congregations,
    isLocal,
    currentOutlineIds,
  };
}
