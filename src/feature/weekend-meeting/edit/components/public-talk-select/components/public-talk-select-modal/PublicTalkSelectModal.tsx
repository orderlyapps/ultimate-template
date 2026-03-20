import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
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
import { useMemo } from "react";

type PublicTalkSelectModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (speakerId: string, outlineId: string) => void;
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
  currentSpeakerId,
  currentOutlineId,
}) => {
  const userCongregationId = localStorage.getItem("congregationId");

  const { data: publishers = [] } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).select(({ p }) => ({
      id: p.id,
      firstName: p.first_name,
      lastName: p.last_name,
      displayName: p.display_name,
      congregationId: p.congregation_id,
    }))
  );

  const { data: speakerOutlines = [] } = useLiveQuery((q) =>
    q.from({ so: speakerOutlineCollection }).select(({ so }) => ({
      speakerId: so.speaker_id,
      outlineId: so.outline_id,
    }))
  );

  const { data: outlines = [] } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).select(({ o }) => ({
      id: o.id,
      theme: o.theme,
    }))
  );

  const { data: congregations = [] } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).select(({ c }) => ({
      id: c.id,
      name: c.name,
    }))
  );

  const speakersWithOutlines = useMemo(() => {
    const speakerMap = new Map<string, SpeakerWithOutlines>();

    speakerOutlines.forEach((so) => {
      const publisher = publishers.find((p) => p.id === so.speakerId);
      const outline = outlines.find((o) => o.id === so.outlineId);

      if (!publisher || !outline) return;

      const congregation = congregations.find(
        (c) => c.id === publisher.congregationId
      );

      const speakerName =
        publisher.displayName ||
        `${publisher.firstName} ${publisher.lastName}`;

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

    return Array.from(speakerMap.values());
  }, [publishers, speakerOutlines, outlines, congregations, userCongregationId]);

  const localSpeakers = speakersWithOutlines.filter((s) => s.isLocal);
  const visitingSpeakers = speakersWithOutlines.filter((s) => !s.isLocal);

  const handleOutlineSelect = (speakerId: string, outlineId: string) => {
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
      </IonHeader>
      <IonContent>
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
