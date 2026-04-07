import type { FC } from "react";
import { useState } from "react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import type { Outline } from "@tanstack-db/outline/outlineSchema";
import { usePublisherOutlines } from "./hooks/usePublisherOutlines";

type SpeakerOutlineSelectProps = {
  /** The publisher ID whose outlines are listed as options */
  publisher_id: string | null | undefined;
  /** Currently selected outline */
  value?: Outline | null;
  /** Callback fired when an outline is selected, receives the full Outline object */
  onSelect: (outline: Outline) => void;
  /** Label displayed above the select field */
  label?: string;
  /** Placeholder text when no outline is selected */
  placeholder?: string;
  /** Modal title */
  modalTitle?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
};

/**
 * A select component that displays a modal listing all outlines assigned to a specific publisher.
 * When clicked, opens a searchable modal to select an outline.
 * The onSelect callback receives the full Outline object.
 *
 * @example
 * <SpeakerOutlineSelect
 *   publisher_id={speaker.id}
 *   value={selectedOutline}
 *   onSelect={(outline) => setSelectedOutline(outline)}
 * />
 */
export const SpeakerOutlineSelect: FC<SpeakerOutlineSelectProps> = ({
  publisher_id,
  value,
  onSelect,
  label = "Outline",
  placeholder = "Select an outline",
  modalTitle = "Select Outline",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { outlines } = usePublisherOutlines(publisher_id);

  /** Display text shown in the trigger item */
  const displayText = value ? `${value.id} - ${value.theme}` : placeholder;

  /** Outlines filtered by the current search query, skipping rows with missing join data */
  const filteredOutlines = outlines.filter((o) => {
    if (!o.id || !o.theme) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      o.theme.toLowerCase().includes(query) ||
      o.id.toLowerCase().includes(query)
    );
  });

  const handleSelect = (outline: { id?: string; theme?: string }) => {
    if (!outline.id || !outline.theme) return;
    onSelect({ id: outline.id, theme: outline.theme });
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Item onClick={() => !disabled && setIsOpen(true)} disabled={disabled}>
        {label && <Label>{label}</Label>}
        <Text>{displayText}</Text>
        <div style={{ width: "0.2rem" }}></div>
        <IonIcon
          ios={chevronExpand}
          md={caretDownSharp}
          color="medium"
          size="small"
        />
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
              placeholder="Search outlines..."
              debounce={300}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List inset>
            <IonListHeader>
              <Label color="medium">Speaker Outlines</Label>
            </IonListHeader>
            {filteredOutlines.map((outline) => (
              <Item
                key={outline.id}
                onClick={() => handleSelect(outline)}
                color={outline.id === value?.id ? "medium" : undefined}
              >
                <Text bold={outline.id === value?.id}>
                  {outline.id} - {outline.theme}
                </Text>
              </Item>
            ))}
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
