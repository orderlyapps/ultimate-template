import { formatPublisherName } from "@util/format/formatPublisherName";

type Publisher = {
  id: string;
  firstName: string;
  middleName: string | null | undefined;
  lastName: string;
  displayName: string | null | undefined;
  congregationId: string;
};

type SpeakerOutline = {
  speakerId: string;
  outlineId: string;
};

type Outline = {
  id: string;
  theme: string;
};

type Congregation = {
  id: string;
  name: string;
};

export type SpeakerWithOutlines = {
  id: string;
  name: string;
  congregationId: string;
  congregationName: string;
  isLocal: boolean;
  outlines: Array<{
    id: string;
    theme: string;
  }>;
};

export const groupSpeakersWithOutlines = (
  publishers: Publisher[],
  speakerOutlines: SpeakerOutline[],
  outlines: Outline[],
  congregations: Congregation[],
  userCongregationId: string | null,
): SpeakerWithOutlines[] => {
  const speakerMap = new Map<string, SpeakerWithOutlines>();

  speakerOutlines.forEach((so) => {
    const publisher = publishers.find((p) => p.id === so.speakerId);
    const outline = outlines.find((o) => o.id === so.outlineId);

    if (!publisher || !outline) return;

    const congregation = congregations.find(
      (c) => c.id === publisher.congregationId,
    );

    const speakerName = formatPublisherName({
      first_name: publisher.firstName,
      middle_name: publisher.middleName,
      last_name: publisher.lastName,
      display_name: publisher.displayName,
    });

    if (!speakerMap.has(publisher.id)) {
      speakerMap.set(publisher.id, {
        id: publisher.id,
        name: speakerName,
        congregationId: publisher.congregationId,
        congregationName: congregation?.name || "Unknown",
        isLocal: publisher.congregationId === userCongregationId,
        outlines: [],
      });
    }

    speakerMap.get(publisher.id)!.outlines.push({
      id: outline.id,
      theme: outline.theme,
    });
  });

  return Array.from(speakerMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

export const filterSpeakers = (
  speakers: SpeakerWithOutlines[],
  searchQuery: string,
): SpeakerWithOutlines[] => {
  if (!searchQuery.trim()) return speakers;

  const query = searchQuery.toLowerCase();
  return speakers.filter(
    (speaker) =>
      speaker.name.toLowerCase().includes(query) ||
      speaker.congregationName.toLowerCase().includes(query),
  );
};
