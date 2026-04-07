import type { FC } from "react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Label } from "@ionic-display/label/Label";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import {
  IonAlert,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, caretDownSharp, chevronExpand } from "ionicons/icons";
import { useState, useMemo } from "react";
import { congregationCollection } from "@tanstack-db/congregation/congregationCollection";
import { useUserCongregation } from "../../user-congregation/use-user-congregation/useUserCongregation";
import { useCongregations } from "./hooks/useCongregations";
import type { Congregation } from "@tanstack-db/congregation/congregationSchema";

type CongregationSelectProps = {
  /** Currently selected congregation */
  value?: Congregation | null;
  /** Callback fired when a congregation is selected */
  onSelect: (congregation: Congregation) => void;
  /** Label displayed above the select field */
  label?: string;
  /** Placeholder text when no congregation is selected */
  placeholder?: string;
  /** Modal title */
  modalTitle?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether to hide the "Add New Congregation" option. Defaults to false (option shown) */
  hideAddOption?: boolean;
};

/**
 * A select component that displays a modal with all congregations.
 * When clicked, opens a searchable modal to select a congregation.
 */
export const CongregationSelect: FC<CongregationSelectProps> = ({
  value,
  onSelect,
  label = "Congregation",
  placeholder = "Select a congregation",
  modalTitle = "Select Congregation",
  disabled = false,
  hideAddOption = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAlert, setShowAddAlert] = useState(false);
  const { congregations } = useCongregations();
  const [userCongregation] = useUserCongregation();

  const displayText = value?.name ?? placeholder;

  const filteredCongregations = useMemo(() => {
    if (!searchQuery.trim()) return congregations;
    const query = searchQuery.toLowerCase();
    return congregations.filter((c) => c.name.toLowerCase().includes(query));
  }, [congregations, searchQuery]);

  const handleSelect = (congregation: Congregation) => {
    onSelect(congregation);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleAddNewCongregation = async (data: { congregationName?: string }) => {
    const name = data.congregationName;
    if (!name?.trim() || !userCongregation) return;

    const newId = crypto.randomUUID();

    await congregationCollection.insert({
      id: newId,
      name: name.trim(),
      congregation_id: userCongregation.id,
    });

    // Construct the congregation object from known values
    const newCongregation: Congregation = {
      id: newId,
      name: name.trim(),
      congregation_id: userCongregation.id,
    };

    handleSelect(newCongregation);
  };

  return (
    <>
      <Item onClick={() => !disabled && setIsOpen(true)} disabled={disabled}>
        {label && <Label>{label}</Label>}
        <Text>{displayText}</Text>
        <div style={{ width: "0.2rem" }}></div>
        <IonIcon
          id="select-icon"
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
              placeholder="Search congregations..."
              debounce={300}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List inset>
            <IonListHeader>
              <Label color="medium">All Congregations</Label>
            </IonListHeader>
            {filteredCongregations.map((congregation) => (
              <Item
                key={congregation.id}
                onClick={() => handleSelect(congregation)}
                color={congregation.id === value?.id ? "medium" : undefined}
              >
                <Text bold={congregation.id === value?.id}>
                  {congregation.name}
                </Text>
              </Item>
            ))}
            {!hideAddOption && (
              <Item onClick={() => setShowAddAlert(true)}>
                <IonIcon icon={addOutline} color="primary" slot="start" />
                <Text color="primary">Add New Congregation</Text>
              </Item>
            )}
          </List>

          <IonAlert
            isOpen={showAddAlert}
            onDidDismiss={() => setShowAddAlert(false)}
            header="Add New Congregation"
            message="Enter the name of the new congregation:"
            inputs={[
              {
                name: "congregationName",
                type: "text",
                placeholder: "Congregation name",
              },
            ]}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
              },
              {
                text: "Add",
                handler: handleAddNewCongregation,
              },
            ]}
          />
        </IonContent>
      </IonModal>
    </>
  );
};
