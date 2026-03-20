import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { speakerOutlineCollection } from "@tanstack-db/speaker_outline/speakerOutlineCollection";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { formatPublisherName } from "@util/format/formatPublisherName";
import { useMemo, useState } from "react";
import { Button } from "@ionic-input/button/Button";

type PublicTalkSelectModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (speakerId: string, outlineId: string | null) => void;
  onDelete?: () => void;
  currentSpeakerId?: string | null;
  currentOutlineId?: string | null;
};

type SpeakerWithOutlines = {
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

export const PublicTalkSelectModal: React.FC<PublicTalkSelectModalProps> = ({
  isOpen,
  onDismiss,
  onSelect,
  onDelete,
  currentSpeakerId,
  currentOutlineId,
}) => {
  const userCongregationId = localStorage.getItem("congregationId");
  const [searchQuery, setSearchQuery] = useState("");

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

  const speakersWithOutlines = useMemo(() => {
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
  }, [
    publishers,
    speakerOutlines,
    outlines,
    congregations,
    userCongregationId,
  ]);

  const filteredSpeakers = useMemo(() => {
    if (!searchQuery.trim()) return speakersWithOutlines;

    const query = searchQuery.toLowerCase();
    return speakersWithOutlines.filter(
      (speaker) =>
        speaker.name.toLowerCase().includes(query) ||
        speaker.congregationName.toLowerCase().includes(query),
    );
  }, [speakersWithOutlines, searchQuery]);

  const localSpeakers = filteredSpeakers.filter((s) => s.isLocal);
  const visitingSpeakers = filteredSpeakers.filter((s) => !s.isLocal);

  const handleOutlineSelect = (speakerId: string, outlineId: string | null) => {
    onSelect(speakerId, outlineId);
  };

  const renderSpeakerAccordion = (speaker: SpeakerWithOutlines) => (
    <IonAccordion key={speaker.id} value={speaker.id}>
      <Item slot="header">
        <Label>
          <Text bold>{speaker.name}</Text>
          {!speaker.isLocal && (
            <Text color="medium"> - {speaker.congregationName}</Text>
          )}
        </Label>
      </Item>
      <List slot="content">
        <Item
          key="tbc"
          onClick={() => handleOutlineSelect(speaker.id, null)}
          color={
            currentSpeakerId === speaker.id && currentOutlineId === null
              ? "medium"
              : undefined
          }
        >
          <Text
            bold={currentSpeakerId === speaker.id && currentOutlineId === null}
            color="medium"
          >
            TBC
          </Text>
        </Item>
        {speaker.outlines.map((outline) => (
          <Item
            key={outline.id}
            onClick={() => handleOutlineSelect(speaker.id, outline.id)}
            color={
              currentSpeakerId === speaker.id && currentOutlineId === outline.id
                ? "medium"
                : undefined
            }
          >
            <Text
              bold={
                currentSpeakerId === speaker.id &&
                currentOutlineId === outline.id
              }
            >
              {outline.theme}
            </Text>
          </Item>
        ))}
      </List>
    </IonAccordion>
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Public Talk</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search speakers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {currentSpeakerId && onDelete && (
          <Button onClick={onDelete} color={"danger"}>
            Clear Assignment
          </Button>
        )}
        {localSpeakers.length > 0 && (
          <List inset>
            <IonListHeader>
              <Label color="medium">Local Speakers</Label>
            </IonListHeader>
            <IonAccordionGroup>
              {localSpeakers.map(renderSpeakerAccordion)}
            </IonAccordionGroup>
          </List>
        )}

        {visitingSpeakers.length > 0 && (
          <List inset>
            <IonListHeader>
              <Label color="medium">Visiting Speakers</Label>
            </IonListHeader>
            <IonAccordionGroup>
              {visitingSpeakers.map(renderSpeakerAccordion)}
            </IonAccordionGroup>
          </List>
        )}

        {speakersWithOutlines.length === 0 && (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <Text color="medium">No speakers with outlines available</Text>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};
