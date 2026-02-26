import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { caretDownSharp, chevronExpand } from "ionicons/icons";
import { useState } from "react";
import addIcon from "@icons/add.svg";

type TypeaheadOption = {
  value: string;
  label: string;
};

type TypeaheadPublisherModalProps = {
  options: TypeaheadOption[];
  label: string;
  value?: string;
  placeholder?: string;
  onValueChange: (value: string | null) => void;
};

const MIN_SEARCH_LENGTH = 3;

export const TypeaheadPublisherModal: React.FC<
  TypeaheadPublisherModalProps
> = ({
  options,
  label,
  value,
  placeholder = "Search your details",
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (selectedValue: string | null) => {
    onValueChange(selectedValue);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  const filteredOptions =
    searchQuery.length >= MIN_SEARCH_LENGTH
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  return (
    <>
      <Item onClick={() => setIsOpen(true)}>
        {label && <Label>{label}</Label>}
        <Text>{displayText}</Text>
        <div style={{ width: "0.2rem" }} />
        <IonIcon
          id="select-icon"
          ios={chevronExpand}
          md={caretDownSharp}
          color="medium"
          size="small"
        />
      </Item>

      <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Search Your Details</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={handleDismiss} />
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <Searchbar
              value={searchQuery}
              onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
              placeholder="Type a name to search..."
              debounce={300}
              autoFocus
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SearchResults
            searchQuery={searchQuery}
            filteredOptions={filteredOptions}
            value={value}
            onSelect={handleSelect}
          />
        </IonContent>
      </IonModal>
    </>
  );
};

type SearchResultsProps = {
  searchQuery: string;
  filteredOptions: TypeaheadOption[];
  value?: string;
  onSelect: (value: string | null) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  filteredOptions,
  value,
  onSelect,
}) => {
  if (searchQuery.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <IonNote>
          <p>Start typing your name to search.</p>
          <p>Type at least 3 characters to see results.</p>
        </IonNote>
      </div>
    );
  }

  if (searchQuery.length < MIN_SEARCH_LENGTH) {
    return (
      <div className="ion-padding ion-text-center">
        <IonNote>
          <p>
            Keep typing... {MIN_SEARCH_LENGTH - searchQuery.length} more{" "}
            {MIN_SEARCH_LENGTH - searchQuery.length === 1
              ? "character"
              : "characters"}{" "}
            needed.
          </p>
        </IonNote>
      </div>
    );
  }

  if (filteredOptions.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <IonNote>
          <p>No publishers found matching "{searchQuery}".</p>
        </IonNote>
      </div>
    );
  }

  return (
    <List inset>
      {filteredOptions.map((option) => (
        <Item
          key={option.value}
          onClick={() => onSelect(option.value)}
          color={option.value === value ? "medium" : undefined}
        >
          <Text bold={option.value === value}>{option.label}</Text>
          <IonIcon src={addIcon} slot="end" />
        </Item>
      ))}
    </List>
  );
};
