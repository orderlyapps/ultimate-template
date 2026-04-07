import type { FC } from "react";
import { useState } from "react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { Label } from "@ionic-display/label/Label";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { formatPublisherName } from "@format/formatPublisherName";
import { type LocalSpeaker, useLocalSpeakers } from "./hooks/useLocalSpeakers";
import { Space } from "@layout/space/Space";

type LocalSpeakerSelectProps = {
  /** Currently selected speaker */
  value?: LocalSpeaker | null;
  /** Callback fired when a speaker is selected */
  onSelect: (speaker: LocalSpeaker) => void;
  /** Label displayed above the select field */
  label?: string;
  /** Placeholder text when no speaker is selected */
  placeholder?: string;
  /** Modal title */
  modalTitle?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
};

/**
 * A reusable select component that displays a searchable modal listing all
 * local speakers (publishers from the user's congregation with speaker outlines).
 *
 * @example
 * <LocalSpeakerSelect
 *   value={selectedSpeaker}
 *   onSelect={(speaker) => setSelectedSpeaker(speaker)}
 * />
 */
export const LocalSpeakerSelect: FC<LocalSpeakerSelectProps> = ({
  value,
  onSelect,
  label = "Speaker",
  placeholder = "Select a speaker",
  modalTitle = "Select Speaker",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { speakers } = useLocalSpeakers();

  /** Display name for the trigger button */
  const displayText = value
    ? formatPublisherName(value, "display last")
    : placeholder;

  /** Speakers filtered by the current search query */
  const filteredSpeakers = speakers.filter((speaker) => {
    if (!searchQuery.trim()) return true;
    const name = formatPublisherName(speaker).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  const handleSelect = (speaker: LocalSpeaker) => {
    onSelect(speaker);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Item onClick={() => !disabled && setIsOpen(true)} disabled={disabled}>
        {label && <Label>{label}</Label>}
        <Text>{displayText}</Text>
        <div style={{ width: "0.2rem" }}></div>
        {!disabled && (
          <IonIcon
            ios={chevronExpand}
            md={caretDownSharp}
            color="medium"
            size="small"
          />
        )}
      </Item>

      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{modalTitle}</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={() => setIsOpen(false)} />
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
          <List>
            <Space height="2" />
            {filteredSpeakers.map((speaker) => (
              <Item
                key={speaker.id}
                onClick={() => handleSelect(speaker)}
                color={speaker.id === value?.id ? "medium" : undefined}
              >
                <Text bold={speaker.id === value?.id}>
                  {formatPublisherName(speaker)}
                </Text>
              </Item>
            ))}
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
