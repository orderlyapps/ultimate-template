import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import {
  groupSpeakersWithOutlines,
  filterSpeakers,
  groupSpeakersByCongregation,
} from "@/content/schedules/weekend-meeting/edit/edit-speaker/utils/groupSpeakersWithOutlines";

/**
 * Hook to fetch and process speaker data for the Edit Speaker page.
 * Returns processed speaker groups for local and visiting speakers.
 */
export function useSpeakerData(searchQuery: string, congregationId: string | undefined) {
  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      firstName: p.first_name,
      middleName: p.middle_name,
      lastName: p.last_name,
      displayName: p.display_name,
      congregationId: p.congregation_id,
    })),
  );

  const { data: speakerOutlines = [] } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }).select(({ so }) => ({
      speakerId: so.speaker_id,
      outlineId: so.outline_id,
    })),
  );

  const { data: outlines = [] } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).select(({ o }) => ({
      id: o.id,
      theme: o.theme,
    })),
  );

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      name: c.name,
    })),
  );

  const speakersWithOutlines = groupSpeakersWithOutlines(
    publishers,
    speakerOutlines,
    outlines,
    congregations,
    congregationId ?? null,
  );

  const filteredSpeakers = filterSpeakers(speakersWithOutlines, searchQuery);
  const localSpeakers = filteredSpeakers.filter((s) => s.isLocal);
  const visitingSpeakers = filteredSpeakers.filter((s) => !s.isLocal);
  const congregationGroups = groupSpeakersByCongregation(visitingSpeakers);

  return {
    speakersWithOutlines,
    localSpeakers,
    congregationGroups,
  };
}
