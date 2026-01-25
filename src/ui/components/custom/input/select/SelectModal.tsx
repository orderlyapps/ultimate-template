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
import { useState } from "react";
import { chevronExpand } from "ionicons/icons";

type SelectOption = {
  readonly value: string | null;
  readonly label: string;
  readonly color?: string;
  readonly bold?: boolean;
} & { value: string; label: string; color?: string; bold?: boolean };

type SelectItemProps = {
  options: readonly SelectOption[];
  label?: string;
  value?: string | null;
  placeholder?: string;
  modalTitle?: string;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
  recentlySelected?: readonly SelectOption[];
  listHeader?: string;
};

export const SelectModal: React.FC<SelectItemProps> = ({
  options,
  label,
  value,
  placeholder = "Select an option",
  modalTitle = "Select an option",
  onValueChange,
  disabled = false,
  recentlySelected = [],
  listHeader = "All Options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (selectedValue: string | null) => {
    onValueChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <>
      <Item onClick={() => !disabled && setIsOpen(true)} disabled={disabled}>
        {label && <Label>{label}</Label>}
        <div
          slot="end"
          style={{
            color: selectedOption ? undefined : "var(--ion-color-medium)",
          }}
        >
          {displayText}
          <IonIcon icon={chevronExpand} color="medium" size="small"></IonIcon>
        </div>
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
              placeholder="Search options..."
              debounce={300}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {recentlySelected.length > 0 && (
            <>
              <IonListHeader>
                <Label color={"medium"}>Recent</Label>
              </IonListHeader>
              <List>
                {recentlySelected.map((option) => (
                  <Item
                    key={option.value ?? "null"}
                    onClick={() => handleSelect(option.value)}
                  >
                    <Text>{option.label}</Text>
                  </Item>
                ))}
              </List>
            </>
          )}
          <List>
            <IonListHeader>
              <Label color={"medium"}>{listHeader}</Label>
            </IonListHeader>
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((option) => (
                <Item
                  key={option.value ?? "null"}
                  onClick={() => handleSelect(option.value)}
                  color={option.value === value ? "medium" : undefined}
                >
                  <Text
                    bold={option.value === value || option.bold}
                    color={option.color}
                  >
                    {option.label}
                  </Text>
                </Item>
              ))}
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
