import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

type SelectOption = {
  readonly value: string | null;
  readonly label: string;
};

type SelectItemProps = {
  options: readonly SelectOption[] | { value: string; label: string }[];
  label?: string;
  value?: string | null;
  placeholder?: string;
  modalTitle?: string;
  onValueChange?: (value: string | null) => void;
  disabled?: boolean;
};

export const SelectModal: React.FC<SelectItemProps> = ({
  options,
  label,
  value,
  placeholder = "Select an option",
  modalTitle = "Select an option",
  onValueChange,
  disabled = false,
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
      <Item
        button
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        {label && <Label>{label}</Label>}
        <div
          slot="end"
          style={{
            color: selectedOption ? undefined : "var(--ion-color-medium)",
          }}
        >
          {displayText}
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
          <List>
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((option) => (
                <Item
                  key={option.value ?? "null"}
                  button
                  onClick={() => handleSelect(option.value)}
                  detail={false}
                  color={option.value === value ? "primary" : undefined}
                >
                  {option.label}
                </Item>
              ))}
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
